import jwt, { SignOptions } from "jsonwebtoken";

const secret = process.env.JWT_SECRET!;

export function signToken(payload: object) {
  return jwt.sign(payload, secret, {
    expiresIn: (process.env.JWT_EXPIRES_IN as SignOptions["expiresIn"]) || "7d",
  });
}

export function verifyToken(token: string) {
  return jwt.verify(token, secret);
}