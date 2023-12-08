import express, { Request, Response, Router } from "express";
import * as controller from "../../controller/admin/song.controller";
import multer from "multer";
import * as uploadClound from "../../middlerware/upload.middlereare";

const upload = multer();

const route: Router = express.Router();

route.get('/', controller.index);

route.get('/create', controller.create);

route.post('/create', upload.single("avatar"), uploadClound.uploadSingle, controller.createPOST);

export const songRoutes = route;