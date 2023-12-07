import { Request, Response } from "express";
import Song from "../../model/song.model";
import Singer from "../../model/singer.model";

import * as searchHelper from "../../helper/search.helper";

//[GET] /search/:style
export const index = async (req: Request, res: Response) => {
  let keyword: string = searchHelper.search(req.query.keyword.toString());
  let regex: RegExp = new RegExp(keyword, "i");
  const style: string = req.params.style;

  let songs = await Song.find({
    $or: [
      { title: regex },
      { slug: regex }
    ]
  });

  let listSong = [];
  for (const song of songs) {
    const singer = await Singer.findOne({
      _id: song.singerId,
      deleted: false
    });
    let newSong = {
      title: song.title,
      avatar: song.avatar,
      description: song.description,
      singerId: song.singerId,
      topicId: song.topicId,
      like: song.like,
      lyrics: song.lyrics,
      audio: song.audio,
      status: song.status,
      slug: song.slug,
      infoSinger: {
        fullName: singer.fullName
      }
    }
    listSong.push(newSong);
  }

  switch (style) {
    case "result":
      res.render('client/pages/search/result.pug', {
        pageTitle: "Kết quả tìm kiếm",
        songs: songs,
        keyword: req.query.keyword.toString()
      })
      break;
    case "suggest":
      res.json({
        code: 200,
        pageTitle: "Kết quả tìm kiếm",
        songs: listSong,
        keyword: req.query.keyword.toString()
      })
      break;
    default:
      break;
  }
}