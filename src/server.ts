import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import { routes } from "./routes";

const app = express();

app.use(
  cors({
    origin: "https://desafio-coopers-web-georgewfsantos.vercel.app/",
  })
);
app.use(express.json());
app.use(routes);

app.listen(3333);
