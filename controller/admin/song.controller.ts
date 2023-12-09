import { Request, Response } from "express";
import Song from "../../model/song.model";
import Topic from "../../model/topic.model";
import Singer from "../../model/singer.model";
import { systemConfig } from "../../config/system";

//[GET] /admin/songs/
export const index = async (req: Request, res: Response): Promise<void> => {
  const songs = await Song.find({
    deleted: false
  });
  res.render("admin/pages/songs/index.pug", {
    pageTitle: "Danh sách bài hát",
    songs: songs
  })
}

//[GET] /admin/songs/create
export const create = async (req: Request, res: Response): Promise<void> => {
  const topics = await Topic.find({
    deleted: false
  }).select("title");

  const singers = await Singer.find({
    deleted: false
  }).select("fullName");

  res.render("admin/pages/songs/create", {
    pageTitle: "Thêm mới bài hát",
    topics: topics,
    singers: singers
  })
}

//[POST] /admin/songs/createPOST
export const createPOST = async (req: Request, res: Response): Promise<void> => {
  try {
    let avatar = "" || req.body.avatar[0];
    let audio = "" || req.body.audio[0];
    const data = {
      title: req.body.title,
      description: req.body.description,
      singerId: req.body.singerId,
      topicId: req.body.topicId,
      status: req.body.status,
      lyrics: req.body.lyrics
    }
    if (avatar) {
      data["avatar"] = avatar;
    }
    if (audio) {
      data["audio"] = audio;
    }
    const newSong = new Song(data);
    await newSong.save();
    res.redirect(`${systemConfig.prefixAdmin}/songs`);
  }
  catch (error) {
    console.log(error);
    res.redirect(`${systemConfig.prefixAdmin}/songs`);
  }
}