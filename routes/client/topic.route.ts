import express, { Request, Response, Router } from "express";
import Topic from "../../model/topic.model";

const route: Router = express();

route.get("/", async (req: Request, res: Response): Promise<void> => {
  const topics = await Topic.find({
    deleted: false
  });
  res.render('client/pages/topics/index');
});

export const topicRoutes: Router = route;