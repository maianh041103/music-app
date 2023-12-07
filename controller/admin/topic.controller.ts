import { Request, Response } from "express";
import Topic from "../../model/topic.model";

export const index = async (req: Request, res: Response): Promise<void> => {
  const topics = await Topic.find({
    deleted: false
  });

  res.render("admin/pages/topics/index.pug", {
    topics: topics,
    pageTitle: "Chủ đề bài hát"
  })
}