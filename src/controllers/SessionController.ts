import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { prisma } from "../lib/prisma";
import { authSecret } from "../utils/auth";

class SessionController {
  async create(request: Request, response: Response) {
    const { email, password } = request.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return response.status(401).json({ error: "User not found" });
    }

    const passwordMatches = async (password: string) => {
      return await bcrypt.compare(password, user.password);
    };

    if (!(await passwordMatches(password))) {
      return response.status(401).json({ error: "Incorrect password" });
    }

    const { id, name } = user;

    return response.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id: user.id }, authSecret, {
        expiresIn: process.env.EXPIRATION_TIME,
      }),
    });
  }
}

export default new SessionController();
