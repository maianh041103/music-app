import express, { Router } from "express";
import * as controller from "../../controller/client/favoriteSong.controller";

const route: Router = express.Router();

route.get('/', controller.index);

export const favoriteSongRoutes = route;