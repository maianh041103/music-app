import express, { Express, Request, Response } from "express";
import * as database from "./config/database";

import Topic from "./model/topic.model";

//Nhúng env
import dotenv from "dotenv";
dotenv.config();
//End nhúng env

const app: Express = express();
const port: number | string = process.env.PORT || 3000;

database.connect();

//Nhúng pug
app.set('views', './view');
app.set('view engine', 'pug');
//End nhúng pug

app.get("/topics", async (req: Request, res: Response): Promise<void> => {
  const topics = await Topic.find({
    deleted: false
  });
  console.log(topics);
  res.render('client/pages/topics/index.pug');
});

app.listen(port, () => {
  console.log("App listen on port : " + port);
})