import { Request, Response } from "express";

import { prisma } from "../lib/prisma";

class ListController {
  async create(request: Request, response: Response) {
    const { userId } = request;
    const { name } = request.body;

    const newList = await prisma.list.create({
      data: {
        name,
        ownerId: userId,
      },
    });

    return response.json(newList);
  }

  async show(request: Request, response: Response) {
    const { userId } = request;
    const { listId } = request.query;

    if (listId) {
      const list = await prisma.list.findUnique({
        where: { id: listId as string },
      });

      return response.json(list);
    }

    const lists = await prisma.list.findMany({
      where: { ownerId: userId },
      include: {
        tasks: true,
      },
    });

    return response.json(lists);
  }
}

export default new ListController();
