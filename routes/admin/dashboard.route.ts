import express, { Response, Request, Router } from "express";
import * as controller from "../../controller/admin/dashboard.controller";

const route = express.Router();

route.get('/', controller.index);

export const dashboardRoute = route;