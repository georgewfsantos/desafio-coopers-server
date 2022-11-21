import { Request, Response } from "express";

import { prisma } from "../lib/prisma";

class TaskController {
  async create(request: Request, response: Response) {
    const { listId } = request.params;
    const { title } = request.body;

    const list = await prisma.list.findUnique({
      where: { id: listId },
    });

    if (!list) {
      return response.status(400).json({ error: "List not found" });
    }

    const newTask = await prisma.task.create({
      data: {
        title,
        listId,
      },
    });

    return response.json(newTask);
  }

  async update(request: Request, response: Response) {
    const { isDone, title } = request.body;
    const { taskId } = request.params;

    if (isDone) {
      const updatedTask = await prisma.task.update({
        where: { id: taskId },
        data: {
          isDone,
        },
      });

      return response.json(updatedTask);
    }

    if (title) {
      const updatedTask = await prisma.task.update({
        where: { id: taskId },
        data: {
          title,
        },
      });

      return response.json(updatedTask);
    }
  }

  async delete(request: Request, response: Response) {
    const { taskId } = request.query;
    const { listId } = request.params;

    if (!taskId) {
      await prisma.task.deleteMany({
        where: { listId },
      });

      return response.json({
        message: "You successfully deleted all tasks from the list.",
      });
    }

    await prisma.task.delete({
      where: {
        id: taskId as string,
      },
    });

    return response.json({
      message: "The task was successfully deleted. ",
    });
  }
}

export default new TaskController();
