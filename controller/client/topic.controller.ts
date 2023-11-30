import { Response, Request } from "express"
import Topic from "../../model/topic.model";

//[GET] /topics
export const topics = async (req: Request, res: Response): Promise<void> => {
  const topics = await Topic.find({
    deleted: false
  });
  res.render('client/pages/topics/index');
}