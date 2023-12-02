const aplayer = document.querySelector("#aplayer");
if (aplayer) {
  let song = aplayer.getAttribute("data-song");
  song = JSON.parse(song);
  let singer = aplayer.getAttribute("data-singer");
  singer = JSON.parse(singer);
  const ap = new APlayer({
    container: aplayer,
    audio: [{
      name: song.title,
      artist: singer.fullName,
      url: song.audio,
      cover: song.avatar
    }],
    autoplay: true,
    volume: 0.8
  });

  const elementAvatar = document.querySelector(".singer-detail .inner-avatar");

  ap.on("play", () => {
    elementAvatar.style.animationPlayState = "running";
  })

  ap.on("pause", () => {
    elementAvatar.style.animationPlayState = "paused";
  })
}
