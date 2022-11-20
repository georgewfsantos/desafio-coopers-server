import { Router } from "express";
import SessionController from "./controllers/SessionController";
import UserController from "./controllers/UserController";

import { authenticate as authMiddleware } from "./middlewares/auth";

const routes = Router();

routes.post("/users", UserController.create);
routes.post("/sessions", SessionController.create);

// routes.use(authMiddleware);

export { routes };
