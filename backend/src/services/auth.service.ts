import { Prisma } from "@prisma/client";
import prisma from "../config/prisma";
import { comparePassword } from "../utils/comparePassword";
import { generateToken } from "../utils/generateToken";
import { hashPassword } from "../utils/hashPassword";
import type { LoginInput, RegisterInput } from "../validators/auth.validator";

const userSelect = {
  id: true,
  name: true,
  email: true,
  avatar: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.UserSelect;

export type SafeUser = Prisma.UserGetPayload<{ select: typeof userSelect }>;

export class AuthError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public error: Record<string, unknown> = {}
  ) {
    super(message);
    this.name = "AuthError";
  }
}

export const register = async (
  input: RegisterInput
): Promise<{ user: SafeUser; token: string }> => {
  const existingUser = await prisma.user.findUnique({
    where: { email: input.email },
    select: { id: true },
  });

  if (existingUser) {
    throw new AuthError("Email already exists", 409);
  }

  const hashedPassword = await hashPassword(input.password);

  const user = await prisma.user.create({
    data: {
      name: input.name,
      email: input.email,
      password: hashedPassword,
    },
    select: userSelect,
  });

  const token = generateToken(user.id);

  return { user, token };
};

export const login = async (
  input: LoginInput
): Promise<{ user: SafeUser; token: string }> => {
  const user = await prisma.user.findUnique({
    where: { email: input.email },
  });

  if (!user) {
    throw new AuthError("Invalid credentials", 401);
  }

  const isPasswordValid = await comparePassword(input.password, user.password);

  if (!isPasswordValid) {
    throw new AuthError("Invalid credentials", 401);
  }

  const token = generateToken(user.id);

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
    token,
  };
};

export const getCurrentUser = async (userId: string): Promise<SafeUser> => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: userSelect,
  });

  if (!user) {
    throw new AuthError("Unauthorized", 401);
  }

  return user;
};
