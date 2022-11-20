import { Secret } from "jsonwebtoken";

export const authSecret = process.env.AUTH_SECRET as Secret;
