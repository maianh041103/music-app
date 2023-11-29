import express, { Express, Request, Response } from "express";

const app: Express = express();
const port = 3000;

app.set('views', './view');
app.set('view engine', 'pug');

app.get("/topics", async (req: Request, res: Response): Promise<void> => {
  res.render('client/pages/topics/index.pug');
});

app.listen(port, () => {
  console.log("App listen on port : " + port);
})