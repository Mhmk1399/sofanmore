import { MongoServerError, ObjectId, type Filter } from "mongodb";

import { ApiProblem } from "@/lib/api-response";
import { hashPassword, verifyPassword } from "@/lib/auth-password";
import {
  readAuthSessionToken,
  verifyAuthSessionToken,
} from "@/lib/auth-session";
import type {
  ValidatedLoginInput,
  ValidatedProfilePatchInput,
  ValidatedSignupInput,
  ValidatedUserPatchInput,
} from "@/lib/auth-validation";
import { ensureUserIndexes, getUserCollections } from "@/lib/mongodb";
import type { UserDocument, UserRole } from "@/models/user";

export type SerializedUser = {
  id: string;
  name: string;
  phone: string;
  role: UserRole;
  isActive: boolean;
  lastLoginAt?: string;
  createdAt: string;
  updatedAt: string;
};

export type UserListQuery = {
  search?: string;
  role?: UserRole;
};

function isDuplicateKeyError(error: unknown) {
  return error instanceof MongoServerError && error.code === 11000;
}

function serializeUser(user: UserDocument): SerializedUser {
  return {
    id: user._id?.toHexString() || "",
    name: user.name,
    phone: user.phone,
    role: user.role,
    isActive: user.isActive,
    ...(user.lastLoginAt ? { lastLoginAt: user.lastLoginAt.toISOString() } : {}),
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  };
}

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function buildUserFilter(query: UserListQuery) {
  const filter: Filter<UserDocument> = {};

  if (query.role) {
    filter.role = query.role;
  }

  if (query.search) {
    const regex = new RegExp(escapeRegex(query.search), "i");

    filter.$or = [{ name: regex }, { phone: regex }, { phoneNormalized: regex }];
  }

  return filter;
}

async function countActiveAdmins(excludingUserId?: ObjectId) {
  const { users } = await getUserCollections();

  return users.countDocuments({
    role: "ADMIN",
    isActive: true,
    ...(excludingUserId ? { _id: { $ne: excludingUserId } } : {}),
  });
}

export async function createUserAccount(input: ValidatedSignupInput) {
  await ensureUserIndexes();

  const { users } = await getUserCollections();
  const now = new Date();
  const document: UserDocument = {
    name: input.name,
    phone: input.phone,
    phoneNormalized: input.phoneNormalized,
    passwordHash: await hashPassword(input.password),
    role: "USER",
    isActive: true,
    createdAt: now,
    updatedAt: now,
  };

  try {
    const result = await users.insertOne(document);

    return serializeUser({ ...document, _id: result.insertedId });
  } catch (error) {
    if (isDuplicateKeyError(error)) {
      throw new ApiProblem("CONFLICT", "This phone number is already registered.", 409, {
        phone: "This phone number is already registered.",
      });
    }

    throw error;
  }
}

export async function authenticateUser(input: ValidatedLoginInput) {
  await ensureUserIndexes();

  const { users } = await getUserCollections();
  const user = await users.findOne({
    phoneNormalized: input.phoneNormalized,
  });

  if (!user || !(await verifyPassword(input.password, user.passwordHash))) {
    throw new ApiProblem("UNAUTHORIZED", "Phone number or password is incorrect.", 401, {
      password: "Phone number or password is incorrect.",
    });
  }

  if (!user.isActive) {
    throw new ApiProblem("FORBIDDEN", "This account is disabled.", 403);
  }

  const now = new Date();

  await users.updateOne(
    { _id: user._id },
    {
      $set: {
        lastLoginAt: now,
        updatedAt: now,
      },
    },
  );

  return serializeUser({
    ...user,
    lastLoginAt: now,
    updatedAt: now,
  });
}

export async function getUserById(userId: ObjectId) {
  await ensureUserIndexes();

  const { users } = await getUserCollections();
  const user = await users.findOne({ _id: userId });

  return user ? serializeUser(user) : null;
}

export async function getAuthenticatedUser(request: Request) {
  const session = verifyAuthSessionToken(readAuthSessionToken(request));

  if (!session) return null;

  const user = await getUserById(new ObjectId(session.userId));

  if (!user?.isActive) return null;

  return user;
}

export async function listUsers(query: UserListQuery = {}) {
  await ensureUserIndexes();

  const { users } = await getUserCollections();
  const filter = buildUserFilter(query);
  const [total, userDocuments] = await Promise.all([
    users.countDocuments(filter),
    users.find(filter).sort({ createdAt: -1 }).limit(200).toArray(),
  ]);

  return {
    users: userDocuments.map(serializeUser),
    total,
  };
}

export async function updateUser(userId: ObjectId, patch: ValidatedUserPatchInput) {
  await ensureUserIndexes();

  const { users } = await getUserCollections();
  const currentUser = await users.findOne({ _id: userId });

  if (!currentUser) {
    throw new ApiProblem("NOT_FOUND", "User was not found.", 404);
  }

  const wouldRemoveAdminAccess =
    currentUser.role === "ADMIN" &&
    currentUser.isActive &&
    (patch.role === "USER" || patch.isActive === false);

  if (wouldRemoveAdminAccess && (await countActiveAdmins(userId)) === 0) {
    throw new ApiProblem(
      "FORBIDDEN",
      "At least one active admin account is required.",
      403,
    );
  }

  const now = new Date();
  const result = await users.findOneAndUpdate(
    { _id: userId },
    {
      $set: {
        ...patch,
        updatedAt: now,
      },
    },
    { returnDocument: "after" },
  );

  if (!result) {
    throw new ApiProblem("NOT_FOUND", "User was not found.", 404);
  }

  return { user: serializeUser(result) };
}

export async function updateOwnProfile(
  userId: ObjectId,
  patch: ValidatedProfilePatchInput,
) {
  await ensureUserIndexes();

  const { users } = await getUserCollections();
  const currentUser = await users.findOne({ _id: userId });

  if (!currentUser) {
    throw new ApiProblem("NOT_FOUND", "User was not found.", 404);
  }

  if (!currentUser.isActive) {
    throw new ApiProblem("FORBIDDEN", "This account is disabled.", 403);
  }

  const now = new Date();
  const setPatch: Partial<UserDocument> = {
    updatedAt: now,
  };

  if (patch.name) setPatch.name = patch.name;
  if (patch.phone && patch.phoneNormalized) {
    setPatch.phone = patch.phone;
    setPatch.phoneNormalized = patch.phoneNormalized;
  }

  if (patch.newPassword) {
    if (
      !patch.currentPassword ||
      !(await verifyPassword(patch.currentPassword, currentUser.passwordHash))
    ) {
      throw new ApiProblem(
        "UNAUTHORIZED",
        "Current password is incorrect.",
        401,
        {
          currentPassword: "Current password is incorrect.",
        },
      );
    }

    setPatch.passwordHash = await hashPassword(patch.newPassword);
  }

  try {
    const result = await users.findOneAndUpdate(
      { _id: userId },
      { $set: setPatch },
      { returnDocument: "after" },
    );

    if (!result) {
      throw new ApiProblem("NOT_FOUND", "User was not found.", 404);
    }

    return { user: serializeUser(result) };
  } catch (error) {
    if (isDuplicateKeyError(error)) {
      throw new ApiProblem(
        "CONFLICT",
        "This phone number is already registered.",
        409,
        {
          phone: "This phone number is already registered.",
        },
      );
    }

    throw error;
  }
}

export async function deleteUser(userId: ObjectId) {
  await ensureUserIndexes();

  const { users } = await getUserCollections();
  const currentUser = await users.findOne({ _id: userId });

  if (!currentUser) {
    throw new ApiProblem("NOT_FOUND", "User was not found.", 404);
  }

  if (
    currentUser.role === "ADMIN" &&
    currentUser.isActive &&
    (await countActiveAdmins(userId)) === 0
  ) {
    throw new ApiProblem(
      "FORBIDDEN",
      "At least one active admin account is required.",
      403,
    );
  }

  await users.deleteOne({ _id: userId });

  return {
    deletedUserId: userId.toHexString(),
  };
}
