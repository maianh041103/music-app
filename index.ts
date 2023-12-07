import express, { Express, Request, Response } from "express";
import * as database from "./config/database";
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';

import routeClient from "./routes/client/index.route";
import routeAdmin from "./routes/admin/index.route.route";
import { systemConfig } from "./config/system";
import path from "path";

//Nhúng env
import dotenv from "dotenv";
dotenv.config();
//End nhúng env

const app: Express = express();
const port: number | string = process.env.PORT || 3000;

database.connect();

//Nhúng biến gloabal
app.locals.prefixAdmin = systemConfig.prefixAdmin;
//End nhúng biến global

//Nhúng tinymce
app.use("/tinymce", express.static(path.join(__dirname, "node_modules", "tinymce")));
//End nhúng tinymce

//Nhúng bodyParse
app.use(bodyParser.urlencoded({ extended: false }))
//End nhúng bodyParse

//Nhúng cookie-parse
app.use(cookieParser());
//End nhúng cookie-parse

//Nhúng pug
app.set('views', './views');
app.set('view engine', 'pug');
//End nhúng pug

//Nhúng folder public
app.use(express.static('public'));
//End nhúng folder public

routeClient(app);
routeAdmin(app);

app.listen(port, () => {
  console.log("App listen on port : " + port);
})