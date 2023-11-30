import express, { Express, Request, Response } from "express";
import * as database from "./config/database";

import routeClient from "./routes/client/index.route";

//Nhúng env
import dotenv from "dotenv";
dotenv.config();
//End nhúng env

const app: Express = express();
const port: number | string = process.env.PORT || 3000;

database.connect();

//Nhúng pug
app.set('views', './views');
app.set('view engine', 'pug');
//End nhúng pug

routeClient(app);

app.listen(port, () => {
  console.log("App listen on port : " + port);
})