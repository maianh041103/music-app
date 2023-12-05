import mongoose from "mongoose";

const favoriteSongSchema = new mongoose.Schema({
  songId: String,
  userId: String,
  deleted: {
    type: Boolean,
    default: false
  },
  deletedAt: Date
}, {
  timestamps: true
});

const FavoriteSong = mongoose.model("Favorite", favoriteSongSchema, "favorites");

export default FavoriteSong;