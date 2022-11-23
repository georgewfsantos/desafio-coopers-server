import { Request, Response } from "express";
import bcrypt from "bcryptjs";

import { prisma } from "../lib/prisma";

class UserController {
  async create(request: Request, response: Response) {
    const { email, name, password } = request.body;

    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      return response.status(400).json({ error: "User Already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        lists: {
          create: { name: "My To-do List" },
        },
      },
      include: {
        lists: {
          include: {
            tasks: true,
          },
        },
      },
    });

    return response.json(user);
  }
}

export default new UserController();
