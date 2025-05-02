import "./css/style.css";
import "./favicon.ico";
import "./images/dagna-gallinger.jpg";

window.onload = function() {
  const videoModalEl = document.getElementById("video-modal");
  const videoPlayerWrapperEl = document.getElementById("video-player-wrapper");
  const videoPlayerEl = document.getElementById("video-player");

  const videoHideButtonEl = document.getElementById("video-hide");

  function onCloseVideoPlayer(e) {
    e.stopPropagation();

    videoPlayerEl.setAttribute("src", "");
    videoModalEl.classList.remove("video-modal--is-visible");
    videoPlayerWrapperEl.removeChild(videoPlayerEl);

    document.removeEventListener("keydown", onEsc);
  }

  function onEsc(e) {
    if (e.key === "Escape") {
      onCloseVideoPlayer();
    }
  }

  videoPlayerWrapperEl.removeChild(videoPlayerEl);

  document.addEventListener("click", function(e) {
    const src = e.target.closest("[data-video-src]")?.getAttribute("data-video-src");

    if (!src) { return; }

    document.addEventListener("keydown", onEsc);

    videoPlayerEl.setAttribute("src", src);
    videoModalEl.classList.add("video-modal--is-visible");
    videoPlayerWrapperEl.appendChild(videoPlayerEl);
    videoPlayerWrapperEl.focus();
  });

  videoModalEl.addEventListener("click", onCloseVideoPlayer);
  videoHideButtonEl.addEventListener("click", onCloseVideoPlayer);

  document.getElementsByTagName("body")[0].classList.remove("loading");
};
