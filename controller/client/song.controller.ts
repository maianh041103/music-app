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
  res.render("client/pages/songs/list.pug", {
    pageTitle: topic.title,
    songs: songs
  });
}

//[GET] /songs/detail/:slug
export const songDetail = async (req: Request, res: Response): Promise<void> => {
  const song = await Song.findOne({
    slug: req.params.slug,
    deleted: false,
    status: "active"
  });

  const singer = await Singer.findOne({
    _id: song.singerId,
    deleted: false
  }).select("fullName");

  const topic = await Topic.findOne({
    _id: song.topicId
  }).select("title");

  res.render("client/pages/songs/detail.pug", {
    pageTitle: song.title,
    song: song,
    topic: topic,
    singer: singer
  })
}

//[PATCH] /songs/like/:typeLike/:idSong
export const like = async (req: Request, res: Response): Promise<void> => {
  try {
    const typeLike: string = req.params.typeLike;
    const idSong: string = req.params.idSong;
    const song = await Song.findOne({
      _id: idSong,
      deleted: false,
      status: "active"
    });
    let like = typeLike == "like" ? song.like + 1 : song.like - 1;
    await Song.updateOne({
      _id: idSong
    }, {
      like: like
    });
    res.json({
      code: 200,
      like: like
    });
  } catch (error) {
    res.json({
      code: 400
    })
  }
}