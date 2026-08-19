import {
  MongoServerError,
  ObjectId,
  type Collection,
  type Filter,
} from "mongodb";

import { ApiProblem } from "@/lib/api-response";
import { ensureProjectIndexes, getProjectCollections } from "@/lib/mongodb";
import {
  createProjectSlug,
  type ValidatedProjectInput,
} from "@/lib/project-validation";
import { deleteUploadedObject } from "@/lib/upload-storage";
import type {
  ProjectDocument,
  ProjectImage,
  ProjectService,
} from "@/models/project";

export type SerializedProjectImage = ProjectImage;

export type SerializedProject = {
  id: string;
  projectCode: number;
  title: string;
  slug: string;
  service: ProjectService;
  coverImageUrl: string;
  coverImageStorageKey?: string;
  images: SerializedProjectImage[];
  excerpt: string;
  brief?: string;
  approach?: string;
  details?: string;
  result?: string;
  locationLabel?: string;
  featured: boolean;
  published: boolean;
  createdAt: string;
  updatedAt: string;
};

export type ProjectListQuery = {
  search?: string;
  service?: ProjectService;
  published?: boolean;
  featured?: boolean;
};

function sortedImages(images: ProjectImage[] = []) {
  return [...images].sort((a, b) => a.sortOrder - b.sortOrder);
}

export function serializeProject(project: ProjectDocument): SerializedProject {
  return {
    id: project._id?.toHexString() || "",
    projectCode: project.projectCode,
    title: project.title,
    slug: project.slug,
    service: project.service,
    coverImageUrl: project.coverImageUrl,
    ...(project.coverImageStorageKey
      ? { coverImageStorageKey: project.coverImageStorageKey }
      : {}),
    images: sortedImages(project.images || []),
    excerpt: project.excerpt,
    ...(project.brief ? { brief: project.brief } : {}),
    ...(project.approach ? { approach: project.approach } : {}),
    ...(project.details ? { details: project.details } : {}),
    ...(project.result ? { result: project.result } : {}),
    ...(project.locationLabel ? { locationLabel: project.locationLabel } : {}),
    featured: Boolean(project.featured),
    published: Boolean(project.published),
    createdAt: project.createdAt.toISOString(),
    updatedAt: project.updatedAt.toISOString(),
  };
}

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function buildProjectFilter(query: ProjectListQuery) {
  const filter: Filter<ProjectDocument> = {};

  if (query.service) filter.service = query.service;
  if (query.published !== undefined) filter.published = query.published;
  if (query.featured !== undefined) filter.featured = query.featured;

  if (query.search) {
    const normalizedSearch = query.search.trim();
    const regex = new RegExp(escapeRegex(normalizedSearch), "i");
    const numericSearch = Number(normalizedSearch);

    filter.$or = [
      { title: regex },
      { slug: regex },
      { excerpt: regex },
      { locationLabel: regex },
    ];

    if (Number.isInteger(numericSearch)) {
      filter.$or.push({ projectCode: numericSearch });
    }
  }

  return filter;
}

async function findLatestProjectCode(projects: Collection<ProjectDocument>) {
  const latest = await projects
    .find({ projectCode: { $gte: 1000 } })
    .sort({ projectCode: -1 })
    .limit(1)
    .next();

  return latest?.projectCode ?? null;
}

function throwProjectConflict(error: unknown): never {
  if (error instanceof MongoServerError && error.code === 11000) {
    const key = error.keyPattern || {};
    const isSlug = "slug" in key;
    throw new ApiProblem(
      "CONFLICT",
      isSlug
        ? "This project slug is already used."
        : "This project code is already used.",
      409,
      isSlug
        ? { slug: "This project slug is already used." }
        : { projectCode: "This project code is already used." },
    );
  }

  throw error;
}

async function resolveUniqueSlug(
  projects: Collection<ProjectDocument>,
  slugBase: string,
  currentProjectId?: ObjectId,
) {
  const base = createProjectSlug(slugBase);
  let slug = base;
  let counter = 2;

  while (
    await projects.findOne({
      slug,
      ...(currentProjectId ? { _id: { $ne: currentProjectId } } : {}),
    })
  ) {
    const suffix = `-${counter}`;
    slug = `${base.slice(0, 180 - suffix.length)}${suffix}`;
    counter += 1;
  }

  return slug;
}

function storageKeysFor(project: ProjectDocument) {
  return Array.from(
    new Set(
      [
        project.coverImageStorageKey,
        ...(project.images || []).map((image) => image.storageKey),
      ].filter((key): key is string => Boolean(key)),
    ),
  );
}

async function deleteStorageKeys(keys: string[], label: string) {
  for (const storageKey of keys) {
    await deleteUploadedObject(storageKey).catch((error) => {
      console.warn(`Could not delete ${label} image object`, {
        storageKey,
        error,
      });
    });
  }
}

function removedStorageKeys(before: ProjectDocument, after: ProjectDocument) {
  const beforeKeys = new Set(storageKeysFor(before));
  const afterKeys = new Set(storageKeysFor(after));
  return [...beforeKeys].filter((key) => !afterKeys.has(key));
}

export async function listProjects(query: ProjectListQuery = {}) {
  await ensureProjectIndexes();

  const { projects } = await getProjectCollections();
  const filter = buildProjectFilter(query);
  const [total, documents, latestCode] = await Promise.all([
    projects.countDocuments(filter),
    projects.find(filter).sort({ createdAt: -1 }).limit(200).toArray(),
    findLatestProjectCode(projects),
  ]);

  return {
    projects: documents.map(serializeProject),
    total,
    latestCode,
  };
}

export async function createProject(input: ValidatedProjectInput) {
  await ensureProjectIndexes();

  if (
    input.projectCode === undefined ||
    !input.title ||
    !input.service ||
    !input.coverImageUrl ||
    !input.excerpt
  ) {
    throw new ApiProblem(
      "VALIDATION_ERROR",
      "Please check the highlighted fields.",
      400,
    );
  }

  const { projects } = await getProjectCollections();
  const now = new Date();
  const slug = await resolveUniqueSlug(projects, input.title);
  const document: ProjectDocument = {
    projectCode: input.projectCode,
    title: input.title,
    slug,
    service: input.service,
    coverImageUrl: input.coverImageUrl,
    ...(input.coverImageStorageKey
      ? { coverImageStorageKey: input.coverImageStorageKey }
      : {}),
    images: sortedImages(input.images || []),
    excerpt: input.excerpt,
    ...(input.brief ? { brief: input.brief } : {}),
    ...(input.approach ? { approach: input.approach } : {}),
    ...(input.details ? { details: input.details } : {}),
    ...(input.result ? { result: input.result } : {}),
    ...(input.locationLabel ? { locationLabel: input.locationLabel } : {}),
    featured: Boolean(input.featured),
    published: Boolean(input.published),
    createdAt: now,
    updatedAt: now,
  };
  let result;

  try {
    result = await projects.insertOne(document);
  } catch (error) {
    throwProjectConflict(error);
  }

  return {
    project: serializeProject({ ...document, _id: result.insertedId }),
  };
}

export async function getProjectById(projectId: ObjectId) {
  await ensureProjectIndexes();

  const { projects } = await getProjectCollections();
  const project = await projects.findOne({ _id: projectId });

  if (!project) {
    throw new ApiProblem("NOT_FOUND", "Project was not found.", 404);
  }

  return {
    project: serializeProject(project),
  };
}

export async function getPublishedProjectBySlug(slug: string) {
  await ensureProjectIndexes();

  const { projects } = await getProjectCollections();
  const project = await projects.findOne({
    slug: createProjectSlug(slug),
    published: true,
  });

  return project ? serializeProject(project) : null;
}

export async function listPublishedProjects(limit = 60) {
  await ensureProjectIndexes();

  const { projects } = await getProjectCollections();
  const documents = await projects
    .find({ published: true })
    .sort({ createdAt: -1 })
    .limit(limit)
    .toArray();

  return documents.map(serializeProject);
}

export async function listFeaturedProjects(limit = 8) {
  await ensureProjectIndexes();

  const { projects } = await getProjectCollections();
  const documents = await projects
    .find({ published: true, featured: true })
    .sort({ createdAt: -1 })
    .limit(limit)
    .toArray();

  return documents.map(serializeProject);
}

export async function updateProject(
  projectId: ObjectId,
  input: ValidatedProjectInput,
) {
  await ensureProjectIndexes();

  const { projects } = await getProjectCollections();
  const existing = await projects.findOne({ _id: projectId });

  if (!existing) {
    throw new ApiProblem("NOT_FOUND", "Project was not found.", 404);
  }

  const $set: Partial<ProjectDocument> = { updatedAt: new Date() };
  const $unset: Record<string, ""> = {};

  for (const field of [
    "projectCode",
    "title",
    "service",
    "coverImageUrl",
    "images",
    "excerpt",
  ] as const) {
    if (input[field] !== undefined) {
      ($set as Record<string, unknown>)[field] = input[field];
    }
  }

  if (input.published !== undefined) {
    $set.published = input.published;
    if (input.published) $set.featured = false;
  }

  if (input.featured !== undefined) {
    $set.featured = input.featured;
    if (input.featured) $set.published = false;
  }

  if (input.title) {
    $set.slug = await resolveUniqueSlug(projects, input.title, projectId);
  }

  for (const field of [
    "coverImageStorageKey",
    "brief",
    "approach",
    "details",
    "result",
    "locationLabel",
  ] as const) {
    if (Object.prototype.hasOwnProperty.call(input, field)) {
      if (input[field]) {
        ($set as Record<string, unknown>)[field] = input[field];
      } else {
        $unset[field] = "";
      }
    }
  }

  const result = await projects
    .findOneAndUpdate(
      { _id: projectId },
      {
        $set,
        ...(Object.keys($unset).length ? { $unset } : {}),
      },
      { returnDocument: "after" },
    )
    .catch(throwProjectConflict);

  if (!result) {
    throw new ApiProblem("NOT_FOUND", "Project was not found.", 404);
  }

  await deleteStorageKeys(removedStorageKeys(existing, result), "replaced project");

  return {
    project: serializeProject(result),
  };
}

export async function deleteProject(projectId: ObjectId) {
  await ensureProjectIndexes();

  const { projects } = await getProjectCollections();
  const project = await projects.findOne({ _id: projectId });

  if (!project) {
    throw new ApiProblem("NOT_FOUND", "Project was not found.", 404);
  }

  const result = await projects.deleteOne({ _id: projectId });

  if (result.deletedCount !== 1) {
    throw new ApiProblem("NOT_FOUND", "Project was not found.", 404);
  }

  await deleteStorageKeys(storageKeysFor(project), "project");

  return {
    deletedProjectId: projectId.toHexString(),
  };
}
