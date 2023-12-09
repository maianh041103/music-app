//Song detail
const aplayer = document.querySelector("#aplayer");
if (aplayer) {
  let song = aplayer.getAttribute("data-song");
  song = JSON.parse(song);
  let singer = aplayer.getAttribute("data-singer");
  singer = JSON.parse(singer);
  const ap = new APlayer({
    container: aplayer,
    lrcType: 1,
    audio: [{
      name: song.title,
      artist: singer.fullName,
      url: song.audio,
      cover: song.avatar,
      lrc: song.lyrics
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

  ap.on("ended", () => {
    const buttonListen = document.querySelector("[button-listen]");
    const songId = buttonListen.getAttribute("button-listen");
    const link = `/songs/listen/${songId}`;
    const option = {
      method: "PATCH"
    }
    fetch(link, option)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.code == 200) {
          const span = buttonListen.querySelector("span");
          span.innerHTML = data.listen + " lượt nghe";
        }
      })
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

//Search
const boxSearch = document.querySelector(".box-search");
if (boxSearch) {
  const input = boxSearch.querySelector("[name='keyword']");
  const innerSuggest = boxSearch.querySelector(".inner-suggest");
  input.addEventListener("keyup", (e) => {
    const keyword = input.value;
    const link = `/search/suggest?keyword=${keyword}`;
    fetch(link)
      .then(res => res.json())
      .then(data => {
        if (data.code == 200) {
          if (data.songs && data.songs.length > 0) {
            const innerList = boxSearch.querySelector(".inner-list");
            let html = data.songs.map(song => {
              return `
                <a href="/songs/detail/${song.slug}" class="inner-item">
                  <div class="inner-image">
                    <img src="${song.avatar}">
                  </div>
                  <div class="inner-info">
                    <div class="inner-title">${song.title}</div>
                    <div class="inner-singer">
                      <i class="fa-solid fa-microphone-lines"></i> ${song.infoSinger.fullName}
                    </div>
                  </div>
                </a>`
            });
            html = html.join("");
            console.log(html);
            innerList.innerHTML = html;
            innerSuggest.classList.add("show");
          } else {
            innerSuggest.classList.remove("show");
          }
        }
      })
  })
}
//End search