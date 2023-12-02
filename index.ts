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

//Nhúng folder public
app.use(express.static('public'));
//End nhúng folder public

routeClient(app);

app.listen(port, () => {
  console.log("App listen on port : " + port);
})