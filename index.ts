import express, { Express, Request, Response } from "express";
import * as database from "./config/database";
import dotenv from "dotenv";
dotenv.config();

const app: Express = express();
const port: number | string = process.env.PORT || 3000;

database.connect();

app.set('views', './view');
app.set('view engine', 'pug');

app.get("/topics", async (req: Request, res: Response): Promise<void> => {
  res.render('client/pages/topics/index.pug');
});

app.listen(port, () => {
  console.log("App listen on port : " + port);
})