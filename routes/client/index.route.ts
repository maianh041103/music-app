import { topicRoutes } from "./topic.route";
import { songRoutes } from "./song.route";
import { favoriteSongRoutes } from "./favoriteSong.route";
import { searchRoutes } from "./search.route";
import { Express } from "express";

const routeClient = (app: Express): void => {
  app.use("/topics", topicRoutes);
  app.use("/songs", songRoutes);
  app.use("/favorite-songs", favoriteSongRoutes);
  app.use("/search", searchRoutes);
}

export default routeClient;