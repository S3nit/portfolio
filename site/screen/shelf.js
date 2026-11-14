import { movies, anime } from "./picks.js";

const shelf = document.querySelector("#screen-shelf");
const viewer = document.querySelector("#screen-viewer");
const card = viewer.querySelector(".screen-card");

function node(tag, className, text) {
  const result = document.createElement(tag);
  result.className = className;
  result.textContent = text || "";
  return result;
}

function artwork(pick, className) {
  if (!pick.poster) return node("span", className + " poster-fallback", pick.title);
  const image = node("img", className);
  image.alt = "";
  image.loading = "lazy";
  image.src = pick.poster;
  image.addEventListener("error", () => image.replaceWith(node("span", className + " poster-fallback", pick.title)), { once: true });
  return image;
}

function openPick(pick, kind) {
  viewer.classList.toggle("view-anime", kind === "anime");
  const body = node("div", "pick-text");
  const title = node("h3", "pick-title", pick.title);
  title.id = "pick-title";
  body.append(node("p", "pick-meta", [kind === "anime" ? "Anime" : "Cinema ticket", pick.year].filter(Boolean).join(" · ")), title);
  if (pick.synopsis) body.append(node("p", "pick-synopsis", pick.synopsis));
  if (pick.character) body.append(node("p", "pick-character", "Favorite character · " + pick.character));
  if (pick.personalNote) {
    body.append(node("h4", "pick-note-heading", "Why I love it"), node("p", "pick-note", pick.personalNote));
  }
  if (pick.trailer) {
    const link = node("a", "pick-trailer", "Official trailer ↗");
    link.href = pick.trailer;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    body.append(link);
  }
  card.replaceChildren(artwork(pick, "pick-art"), body);
  viewer.showModal();
}

function addRow(label, kind, picks) {
  if (!picks.length) return;
  const section = node("section", "screen-row " + kind);
  const heading = node("h3", "screen-label", label);
  const rack = node("div", "screen-rack");
  for (const pick of picks) {
    const button = node("button", "screen-case");
    button.type = "button";
    button.setAttribute("aria-haspopup", "dialog");
    button.setAttribute("aria-label", "Open " + pick.title);
    const sleeve = node("span", "screen-sleeve");
    sleeve.append(artwork(pick, "screen-poster"));
    if (kind === "anime") sleeve.append(node("span", "box-spine", pick.title));
    button.append(sleeve, node("span", "screen-caption", pick.title));
    button.addEventListener("click", () => openPick(pick, kind));
    rack.append(button);
  }
  section.append(heading, rack);
  shelf.append(section);
}

addRow("Movies", "movies", movies);
addRow("Anime", "anime", anime);
shelf.hidden = !(movies.length || anime.length);
