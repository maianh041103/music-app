//Song detail
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
//End song deatil

//Like
const buttonLike = document.querySelectorAll("[button-like]");
if (buttonLike) {
  buttonLike.forEach(button => {
    button.addEventListener("click", () => {
      const songId = button.getAttribute("button-like");
      const isActive = button.classList.contains("active");
      let typeLike = isActive ? "dislike" : "like";

      const link = `/songs/like/${typeLike}/${songId}`;

      const options = {
        method: "PATCH"
      };

      fetch(link, options)
        .then(res => res.json())
        .then((data) => {
          if (data && data.code == 200) {
            const span = button.querySelector("span");
            span.innerHTML = data.like;
            button.classList.toggle("active");
          }
        })
    })
  });
}
//End Like

//Favorite
const buttonFavorite = document.querySelectorAll("[button-favorite]");
if (buttonFavorite) {
  buttonFavorite.forEach(button => {
    button.addEventListener("click", () => {
      const songId = button.getAttribute("button-favorite");
      let isFavorite = button.classList.contains("active");
      const typeFavorite = isFavorite ? "unfavorite" : "favorite";

      const link = `/songs/favorite/${typeFavorite}/${songId}`;
      const options = {
        method: "PATCH"
      };

      fetch(link, options)
        .then(res => res.json())
        .then((data) => {
          if (data.code == 200) {
            button.classList.toggle("active");
          }
        })
    })
  })
}
//End favorite
