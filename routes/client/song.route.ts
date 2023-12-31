import express, { Request, Response, Router } from "express";
import * as controller from "../../controller/client/song.controller";

const route: Router = express.Router();

route.get('/:slug', controller.detail);

route.get('/detail/:slug', controller.songDetail);

route.patch('/like/:typeLike/:idSong', controller.like);

route.patch('/favorite/:typeFavorite/:songId', controller.favoriteSong);

route.patch('/listen/:songId', controller.listen);

export const songRoutes: Router = route;