import { topicRoutes } from "./topic.route";
import { Express } from "express";

const routeClient = (app: Express): void => {
  app.use("/topics", topicRoutes);
}

export default routeClient;