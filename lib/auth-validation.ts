import { validationError, type FieldErrors } from "@/lib/api-response";
import { USER_ROLES, type UserRole } from "@/models/user";

type UnknownRecord = Record<string, unknown>;

export type ValidatedSignupInput = {
  name: string;
  phone: string;
  phoneNormalized: string;
  password: string;
};

export type ValidatedLoginInput = {
  phone: string;
  phoneNormalized: string;
  password: string;
};

export type ValidatedUserPatchInput = {
  role?: UserRole;
  isActive?: boolean;
};

export type ValidatedProfilePatchInput = {
  name?: string;
  phone?: string;
  phoneNormalized?: string;
  currentPassword?: string;
  newPassword?: string;
};

function isRecord(value: unknown): value is UnknownRecord {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function cleanText(value: unknown, field: string, errors: FieldErrors, max = 120) {
  if (typeof value !== "string") {
    errors[field] = "Enter text.";
    return "";
  }

  return value
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

export function normalizeAuthPhone(value: string) {
  const trimmed = value.trim();
  const hasLeadingPlus = trimmed.startsWith("+");
  const digits = trimmed.replace(/\D/g, "");

  return `${hasLeadingPlus ? "+" : ""}${digits}`;
}

function validatePhone(value: unknown, errors: FieldErrors) {
  const phone = cleanText(value, "phone", errors, 32);
  const phoneNormalized = normalizeAuthPhone(phone);

  if (!phone || !phoneNormalized) {
    errors.phone = "Enter a phone number.";
    return { phone, phoneNormalized };
  }

  if (!/^\+?[0-9]{7,20}$/.test(phoneNormalized)) {
    errors.phone = "Enter a valid phone number.";
  }

  return { phone, phoneNormalized };
}

export function passwordStrengthErrors(password: string) {
  const issues: string[] = [];

  if (password.length < 10) {
    issues.push("Use at least 10 characters for the password.");
  }

  if (password.length > 128) {
    issues.push("Use 128 characters or fewer for the password.");
  }

  if (!/[a-z]/.test(password)) {
    issues.push("Add a lowercase letter for the password.");
  }

  if (!/[A-Z]/.test(password)) {
    issues.push("Add an uppercase letter for the password.");
  }

  if (!/[0-9]/.test(password)) {
    issues.push("Add a number.");
  }

  if (!/[^A-Za-z0-9]/.test(password)) {
    issues.push("Add a symbol.");
  }

  return issues;
}

function validatePassword(value: unknown, errors: FieldErrors, strong = true) {
  if (typeof value !== "string") {
    errors.password = "Enter a password.";
    return "";
  }

  if (!value) {
    errors.password = "Enter a password.";
    return "";
  }

  if (strong) {
    const issues = passwordStrengthErrors(value);

    if (issues.length > 0) {
      errors.password = issues.join(" ");
    }
  }

  return value;
}

function validateOptionalPassword(
  value: unknown,
  field: string,
  errors: FieldErrors,
  strong = true,
) {
  if (value === null || value === undefined || value === "") {
    return undefined;
  }

  if (typeof value !== "string") {
    errors[field] = "Enter a password.";
    return undefined;
  }

  if (strong) {
    const issues = passwordStrengthErrors(value);

    if (issues.length > 0) {
      errors[field] = issues.join(" ");
    }
  }

  return value;
}

export function validateSignupInput(input: unknown): ValidatedSignupInput {
  const errors: FieldErrors = {};

  if (!isRecord(input)) {
    throw validationError({ body: "Use a valid JSON object." });
  }

  const name = cleanText(input.name, "name", errors, 120);
  const { phone, phoneNormalized } = validatePhone(input.phone, errors);
  const password = validatePassword(input.password, errors);

  if (!name) {
    errors.name = "Enter your name.";
  } else if (name.length < 2) {
    errors.name = "Use at least 2 characters.";
  }

  if (Object.keys(errors).length > 0) {
    throw validationError(errors);
  }

  return {
    name,
    phone,
    phoneNormalized,
    password,
  };
}

export function validateLoginInput(input: unknown): ValidatedLoginInput {
  const errors: FieldErrors = {};

  if (!isRecord(input)) {
    throw validationError({ body: "Use a valid JSON object." });
  }

  const { phone, phoneNormalized } = validatePhone(input.phone, errors);
  const password = validatePassword(input.password, errors, false);

  if (Object.keys(errors).length > 0) {
    throw validationError(errors);
  }

  return {
    phone,
    phoneNormalized,
    password,
  };
}

export function validateUserPatchInput(input: unknown): ValidatedUserPatchInput {
  const errors: FieldErrors = {};

  if (!isRecord(input)) {
    throw validationError({ body: "Use a valid JSON object." });
  }

  const patch: ValidatedUserPatchInput = {};

  if (input.role != null) {
    if (
      typeof input.role !== "string" ||
      !(USER_ROLES as readonly string[]).includes(input.role)
    ) {
      errors.role = "Choose a valid role.";
    } else {
      patch.role = input.role as UserRole;
    }
  }

  if (input.isActive != null) {
    if (typeof input.isActive !== "boolean") {
      errors.isActive = "Choose active or disabled.";
    } else {
      patch.isActive = input.isActive;
    }
  }

  if (!patch.role && patch.isActive == null && Object.keys(errors).length === 0) {
    errors.body = "Choose something to update.";
  }

  if (Object.keys(errors).length > 0) {
    throw validationError(errors);
  }

  return patch;
}

export function validateProfilePatchInput(
  input: unknown,
): ValidatedProfilePatchInput {
  const errors: FieldErrors = {};

  if (!isRecord(input)) {
    throw validationError({ body: "Use a valid JSON object." });
  }

  const patch: ValidatedProfilePatchInput = {};

  if (input.name != null) {
    const name = cleanText(input.name, "name", errors, 120);

    if (!name) {
      errors.name = "Enter your name.";
    } else if (name.length < 2) {
      errors.name = "Use at least 2 characters.";
    } else {
      patch.name = name;
    }
  }

  if (input.phone != null) {
    const { phone, phoneNormalized } = validatePhone(input.phone, errors);

    if (!errors.phone) {
      patch.phone = phone;
      patch.phoneNormalized = phoneNormalized;
    }
  }

  const wantsPasswordChange =
    typeof input.newPassword === "string" && input.newPassword.trim() !== "";

  if (wantsPasswordChange) {
    const currentPassword = validateOptionalPassword(
      input.currentPassword,
      "currentPassword",
      errors,
      false,
    );
    const newPassword = validateOptionalPassword(
      input.newPassword,
      "newPassword",
      errors,
      true,
    );

    if (newPassword && !currentPassword) {
      errors.currentPassword = "Enter your current password.";
    }

    if (currentPassword) patch.currentPassword = currentPassword;
    if (newPassword) patch.newPassword = newPassword;
  }

  if (
    !patch.name &&
    !patch.phone &&
    !patch.newPassword &&
    Object.keys(errors).length === 0
  ) {
    errors.body = "Choose something to update.";
  }

  if (Object.keys(errors).length > 0) {
    throw validationError(errors);
  }

  return patch;
}
