import express, { Request, Response, Router } from "express";
import * as controller from "../../controller/client/topic.controller";

const route: Router = express();

route.get("/", controller.topics);

export const topicRoutes: Router = route;