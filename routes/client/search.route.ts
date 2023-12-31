import express, { Express, Router, Request, Response } from "express";
import * as controller from "../../controller/client/search.controller";

const route: Router = express.Router();

route.get('/:style', controller.index);

export const searchRoutes = route;