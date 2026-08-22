import { Prisma } from "@prisma/client";
import prisma from "../config/prisma";
import type { UpdateProfileInput } from "../validators/profile.validator";

const userSelect = {
  id: true,
  name: true,
  email: true,
  avatar: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.UserSelect;

export type SafeUser = Prisma.UserGetPayload<{ select: typeof userSelect }>;

export class ProfileError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public error: Record<string, unknown> = {}
  ) {
    super(message);
    this.name = "ProfileError";
  }
}

export const getProfile = async (userId: string): Promise<SafeUser> => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: userSelect,
  });

  if (!user) {
    throw new ProfileError("User not found", 404);
  }

  return user;
};

export const updateProfile = async (
  userId: string,
  input: UpdateProfileInput
): Promise<SafeUser> => {
  const existing = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true },
  });

  if (!existing) {
    throw new ProfileError("User not found", 404);
  }

  const data: Prisma.UserUpdateInput = {};

  if (input.name !== undefined) {
    data.name = input.name;
  }

  if (input.avatar !== undefined) {
    data.avatar = input.avatar;
  }

  return prisma.user.update({
    where: { id: userId },
    data,
    select: userSelect,
  });
};
