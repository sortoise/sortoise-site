// Plays the Sortoise video inside any frame marked data-video-frame (Home video section and the
// Case Study page). Pressing the pink play button swaps the poster for the video.
//
// data-src:   a video file on this site (the .mp4 in public/video), played in the browser's own player.
// data-embed: a YouTube or Vimeo "embed" address. Only used when there is no data-src.
document.querySelectorAll<HTMLElement>("[data-video-frame]").forEach((frame) => {
  const play = frame.querySelector<HTMLButtonElement>("[data-play]");
  if (!play) return;
  play.addEventListener("click", () => {
    const file = frame.dataset.src;
    const embed = frame.dataset.embed;
    const title = frame.dataset.title || "Sortoise video";

    if (file) {
      const video = document.createElement("video");
      video.src = file;
      video.controls = true;
      video.playsInline = true;
      video.preload = "auto";
      video.setAttribute("title", title);
      frame.classList.add("is-playing");
      frame.replaceChildren(video);
      video.play().catch(() => {
        // If the browser blocks playing straight away, the controls are there to press play.
      });
      video.focus();
      return;
    }

    if (embed) {
      const iframe = document.createElement("iframe");
      iframe.src = embed + (embed.includes("?") ? "&" : "?") + "autoplay=1";
      iframe.title = title;
      iframe.allow = "autoplay; fullscreen; picture-in-picture";
      iframe.setAttribute("allowfullscreen", "");
      frame.classList.add("is-playing");
      frame.replaceChildren(iframe);
    }
  });
});
