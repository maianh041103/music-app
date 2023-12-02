import { topicRoutes } from "./topic.route";
import { songRoutes } from "./song.route";
import { Express } from "express";

const routeClient = (app: Express): void => {
  app.use("/topics", topicRoutes);
  app.use("/songs", songRoutes);
}

export default routeClient;