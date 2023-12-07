import { Request, Response } from "express";
import Song from "../../model/song.model";

export const index = async (req: Request, res: Response): Promise<void> => {
  const songs = await Song.find({
    deleted: false
  });
  res.render("admin/pages/songs/index.pug", {
    pageTitle: "Danh sách bài hát",
    songs: songs
  })
}