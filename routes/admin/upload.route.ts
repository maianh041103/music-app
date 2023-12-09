import { Router } from "express";
import multer from "multer";

import * as controller from "../../controller/admin/upload.controller";

import * as uploadCloud from "../../middlerware/upload.middlereare";

const upload = multer();

const route: Router = Router();

route.post('/', upload.single("file"), uploadCloud.uploadSingle, controller.upload);

export const uploadRoutes: Router = route;