import { Response, Request } from "express"
import Topic from "../../model/topic.model";

//[GET] /topics
export const topics = async (req: Request, res: Response): Promise<void> => {
  const topics = await Topic.find({
    status: "active",
    deleted: false
  });
  res.render('client/pages/topics/index', {
    pageTitle: "Chủ đề bài hát",
    topics: topics
  });
}