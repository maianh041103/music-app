import express, { Request, Response, Router } from "express";
import * as controller from "../../controller/admin/song.controller";
import multer from "multer";
import * as uploadClound from "../../middlerware/upload.middlereare";

const upload = multer();

const route: Router = express.Router();

route.get('/', controller.index);

route.get('/create', controller.create);

route.post('/create', upload.fields([
  { name: 'avatar', maxCount: 1 },
  { name: 'audio', maxCount: 1 }]),
  uploadClound.uploadFields, controller.createPOST);

route.get('/edit/:id', controller.edit);

route.patch('/edit/:id', upload.fields([
  { name: 'avatar', maxCount: 1 },
  { name: 'audio', maxCount: 1 }]),
  uploadClound.uploadFields, controller.editPATCH);

export const songRoutes = route;