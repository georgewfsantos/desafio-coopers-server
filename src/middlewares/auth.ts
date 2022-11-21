import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import { authSecret } from "../utils/auth";

type Decoded = string | JwtPayload;

type DecodedToken = Decoded & {
  id: string;
};

export async function authenticate(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({ error: "Token not provided" });
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = jwt.verify(token, authSecret);

    request.userId = (decoded as DecodedToken).id;
  } catch (error) {
    return response.status(401).json({ error: "Invalid token" });
  }

  return next();
}
