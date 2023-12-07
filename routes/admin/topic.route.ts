import express, { Request, Response, Router } from "express";
import * as controller from "../../controller/admin/topic.controller";
const route: Router = express.Router();

route.get('/', controller.index);

export const topicRoutes: Router = route;