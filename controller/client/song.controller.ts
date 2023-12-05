import { Request, Response } from "express";
import Song from "../../model/song.model";
import Topic from "../../model/topic.model";
import Singer from "../../model/singer.model";
import FavoriteSong from "../../model/favorite.model";

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

  const favoriteSong = await FavoriteSong.findOne({
    songId: song.id,
    userId: res.locals.account.id
  });

  let isFavorite = favoriteSong ? "active" : "";

  let isLike = song.like.find(accountId => {
    return accountId === res.locals.account.id;
  });

  if (isLike) {
    isLike = "active";
  } else {
    isLike = "";
  }

  res.render("client/pages/songs/detail.pug", {
    pageTitle: song.title,
    song: song,
    topic: topic,
    singer: singer,
    isFavorite: isFavorite,
    isLike: isLike
  })
}

//[PATCH] /songs/like/:typeLike/:idSong
export const like = async (req: Request, res: Response): Promise<void> => {
  try {
    const typeLike: string = req.params.typeLike;
    const idSong: string = req.params.idSong;

    if (typeLike == "like") {
      const isLike = await Song.findOne({
        _id: idSong,
        like: res.locals.account.id
      });
      if (!isLike) {
        await Song.updateOne({
          _id: idSong
        }, {
          $push: { like: res.locals.account.id }
        });
      }
    }
    else {
      await Song.updateOne({
        _id: idSong
      }, {
        $pull: { like: res.locals.account.id }
      });
    }

    const song = await Song.findOne({
      _id: idSong
    });

    res.json({
      code: 200,
      like: song.like.length
    });
  } catch (error) {
    res.json({
      code: 400
    })
  }
}

//[PACTH] /songs/favorite/:typeFavorite/:songId
export const favoriteSong = async (req: Request, res: Response) => {
  try {
    const typeFavorite: string = req.params.typeFavorite;
    const songId: string = req.params.songId;
    switch (typeFavorite) {
      case "favorite":
        const data = {
          songId: songId,
          userId: res.locals.account.id
        };
        const favoriteSong = new FavoriteSong(data);
        await favoriteSong.save();
        break;
      case "unfavorite":
        await FavoriteSong.deleteOne({
          songId: songId,
          userId: res.locals.account.id
        });
        break;
      default:
        break;
    }
    res.json({
      code: 200,
      message: "Thành công"
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Thất bại"
    });
  }
}