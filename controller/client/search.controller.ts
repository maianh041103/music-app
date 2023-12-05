import { Request, Response } from "express";
import Song from "../../model/song.model";
import Singer from "../../model/singer.model";

import * as searchHelper from "../../helper/search.helper";

//[GET] /search/result
export const index = async (req: Request, res: Response) => {
  let keyword: string = searchHelper.search(req.query.keyword.toString());
  let regex: RegExp = new RegExp(keyword, "i");

  let songs = await Song.find({
    $or: [
      { title: regex },
      { slug: regex }
    ]
  });

  for (const song of songs) {
    const singer = await Singer.findOne({
      _id: song.singerId,
      deleted: false
    });
    song["infoSinger"] = singer;
  }

  res.render('client/pages/search/result.pug', {
    pageTitle: "Kết quả tìm kiếm",
    songs: songs,
    keyword: req.query.keyword.toString()
  })
}