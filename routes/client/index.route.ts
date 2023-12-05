import { topicRoutes } from "./topic.route";
import { songRoutes } from "./song.route";
import { favoriteSongRoutes } from "./favoriteSong.route";
import { searchRoutes } from "./search.route";
import { accountRoutes } from "./account.route";
import * as accountMidllerware from "../../middlerware/account.middlerware";
import { Express } from "express";

const routeClient = (app: Express): void => {
  app.use(accountMidllerware.checkToken);
  app.use("/topics", topicRoutes);
  app.use("/songs", songRoutes);
  app.use("/favorite-songs", favoriteSongRoutes);
  app.use("/search", searchRoutes);
  app.use("/accounts", accountRoutes);
}

export default routeClient;