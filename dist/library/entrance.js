const link = document.querySelector(".library-jump");
const library = document.querySelector("#library");
const folio = document.querySelector(".library-folio");
const motion = matchMedia("(prefers-reduced-motion: no-preference)");
let phase = "idle";
let fallback;
let observer;

function reset() {
  clearTimeout(fallback);
  phase = "idle";
  folio.hidden = true;
  folio.classList.remove("arriving", "opening");
}

function arrive() {
  if (phase !== "arriving") return;
  phase = "opening";
  clearTimeout(fallback);
  if (location.hash !== link.hash) location.hash = link.hash;
  library.scrollIntoView({ block: "start", behavior: "instant" });
  library.focus({ preventScroll: true });
  folio.classList.replace("arriving", "opening");
  fallback = setTimeout(reset, 1150);
}

link.addEventListener("click", event => {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey ||
      event.shiftKey || event.altKey || !motion.matches || !CSS.supports("perspective", "1000px")) return;
  event.preventDefault();
  if (phase !== "idle") return;
  phase = "arriving";
  observer?.disconnect();
  library.classList.remove("shelf-arrival");
  folio.hidden = false;
  folio.classList.add("arriving");
  fallback = setTimeout(arrive, 420);
});

folio.addEventListener("animationend", event => {
  if (event.animationName === "folio-arrive") arrive();
  if (event.animationName === "folio-turn" && event.target.classList.contains("back-leaf")) reset();
});

function skip() {
  if (phase === "idle") return;
  arrive();
  reset();
}

window.addEventListener("keydown", event => {
  if (event.key === "Escape" || event.key === "Tab") skip();
});
motion.addEventListener("change", () => { if (!motion.matches) skip(); });
window.addEventListener("pagehide", reset);
window.addEventListener("popstate", () => {
  if (location.hash !== link.hash && phase !== "idle") reset();
});

// Manual scrolling gets one short reveal without changing the scroll position.
if (motion.matches && !location.hash && "IntersectionObserver" in window) {
  observer = new IntersectionObserver(entries => {
    if (entries.some(entry => entry.isIntersecting)) {
      observer.disconnect();
      if (phase === "idle" && motion.matches) library.classList.add("shelf-arrival");
    }
  }, { rootMargin: "0px 0px -12% 0px" });
  observer.observe(library.querySelector(".cabinet"));
}
