import { Router } from "express";
import ListController from "./controllers/ListController";
import SessionController from "./controllers/SessionController";
import TaskController from "./controllers/TaskController";
import UserController from "./controllers/UserController";

import { authenticate as authMiddleware } from "./middlewares/auth";

const routes = Router();

routes.post("/users", UserController.create);
routes.post("/sessions", SessionController.create);

routes.use(authMiddleware);

routes.get("/lists", ListController.show);

routes.post("/lists/:listId/tasks", TaskController.create);
routes.patch("/lists/:listId/tasks/:taskId", TaskController.update);
routes.delete("/lists/:listId/tasks", TaskController.delete);

export { routes };
