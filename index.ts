import express, { Express, Request, Response, Router } from "express";

const route: Router = express.Router();

const app: Express = express();

const port = 3000;

app.get("/topics", async (req: Request, res: Response): Promise<void> => {
  res.send("Chủ đề bài hát");
});

app.listen(port, () => {
  console.log("App listen on port : " + port);
})