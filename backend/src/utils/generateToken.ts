import jwt, { SignOptions } from "jsonwebtoken";
import { env } from "../config/env";

export const generateToken = (userId: string): string => {
  const options: SignOptions = {
    expiresIn: "7d",
  };

  return jwt.sign({ userId }, env.JWT_SECRET, options);
};
