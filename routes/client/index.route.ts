import { topicRoutes } from "./topic.route";
import { songRoutes } from "./song.route";
import { favoriteSongRoutes } from "./favoriteSong.route";
import { searchRoutes } from "./search.route";
import { accountRoutes } from "./account.route";
import * as accountMidllerware from "../../middlerware/account.middlerware";
import { Express } from "express";

const routeClient = (app: Express): void => {
  app.use("/topics", accountMidllerware.checkToken, topicRoutes);
  app.use("/songs", accountMidllerware.checkToken, songRoutes);
  app.use("/favorite-songs", accountMidllerware.checkToken, favoriteSongRoutes);
  app.use("/search", accountMidllerware.checkToken, searchRoutes);
  app.use("/accounts", accountRoutes);
}

export default routeClient;