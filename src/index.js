import "./css/style.css";
import "./favicon.ico";
import "./images/dagna-gallinger.jpg";

window.onload = function() {
  const videoWrapperEl = document.getElementById("video-wrapper");
  const videoPlayerWrapperEl = document.getElementById("video-player-wrapper");
  const videoPlayerEl = document.getElementById("video-player");

  const videoShowButtonEl = document.getElementById("video-show");
  const videoHideButtonEl = document.getElementById("video-hide");

  videoPlayerWrapperEl.removeChild(videoPlayerEl);

  videoShowButtonEl.addEventListener("click", function() {
    videoWrapperEl.classList.add("video-wrapper--is-visible");
    videoPlayerWrapperEl.appendChild(videoPlayerEl);
  });

  videoHideButtonEl.addEventListener("click", function() {
    videoWrapperEl.classList.remove("video-wrapper--is-visible");
    videoPlayerWrapperEl.removeChild(videoPlayerEl);
  });

  document.getElementsByTagName("body")[0].classList.remove("loading");
};
