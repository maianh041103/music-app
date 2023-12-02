import { Request, Response } from "express";
import Song from "../../model/song.model";
import Topic from "../../model/topic.model";
import Singer from "../../model/singer.model";

//[GET] /songs/:slug
export const detail = async (req: Request, res: Response): Promise<void> => {
  const topic = await Topic.findOne({
    slug: req.params.slug,
    deleted: false
  });

  const songs = await Song.find({
    topicId: topic.id,
    deleted: false,
    status: "active"
  });

  for (const song of songs) {
    const singer = await Singer.findOne({
      _id: song.singerId,
      deleted: false
    }).select("fullName");
    if (singer) {
      song["infoSinger"] = singer;
    }
  }
  console.log(songs);
  res.render("client/pages/songs/list.pug", {
    pageTitle: topic.title,
    songs: songs
  });
}