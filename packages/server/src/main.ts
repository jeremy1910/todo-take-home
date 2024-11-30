// import { createServer } from "../client/vite-server";
import { Sequelize } from "sequelize";
import bodyParser from "body-parser";
import express from "express";
import cors, { CorsOptions } from "cors";

import { initTodo } from "./models/Todo";
import APIRoutes from "./routes/api";

const start = async ({ PORT }: { PORT: number }) => {
  const sequelize = new Sequelize({
    dialect: "postgres",
    database: "postgres",
    username: "postgres",
    password: "postgres",
    host: "127.0.0.1",
    port: 5432,
  });

  initTodo(sequelize);

  const app = express();

  /**
   * Configure CORS
   */
  const origin: (string | RegExp)[] = [/\.my-domain\.io$/];
  if (process.env.NODE_ENV === "development") {
    origin.push(/localhost/, /127\.0\.0\.1/);
  }

  app.use(
    cors({
      origin,
    })
  );

  app.get("/test", (_, res) => {
    res.json({ hello: "worlddd" });
  });

  app.use(bodyParser.json());
  app.use("/", APIRoutes);

  await sequelize.sync();

  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
};

start({ PORT: 8080 });
