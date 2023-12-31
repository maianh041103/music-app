import { Request, Response } from "express"
import FavoriteSong from "../../model/favorite.model";
import Song from "../../model/song.model";
import Singer from "../../model/singer.model";

export const index = async (req: Request, res: Response) => {
  const listFavoriteSong = await FavoriteSong.find({
    userId: res.locals.account.id
  });

  let listSong = [];
  for (let favoriteSong of listFavoriteSong) {
    let song = await Song.findOne({
      _id: favoriteSong.songId,
      deleted: false
    });
    let singer = await Singer.findOne({
      _id: song.singerId
    });
    song["singerName"] = singer.fullName;
  }

  console.log(listSong);

  res.render('client/pages/favorite-songs/index', {
    pageTitle: "Bài hát yêu thích",
    listSong: listSong
  });
}