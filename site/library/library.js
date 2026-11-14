import { shelves } from "./books.js";

const cabinet = document.querySelector("#bookcase");
const reader = document.querySelector("#reader");
const leaf = document.querySelector("#leaf");
const previous = document.querySelector("#previous-page");
const next = document.querySelector("#next-page");
const number = document.querySelector("#page-number");

const ns = "http://www.w3.org/2000/svg";
const motifs = {
  loop: "M9 36 Q25 5 44 36 T80 36 Q63 5 44 36 T9 36Z",
  bits: "M18 27v18 M37 27h12v18H37z M68 27v18",
  mouse: "M13 53Q18 29 44 32Q37 14 51 16Q62 17 58 33L76 45L62 51Q44 57 26 52Q7 64 7 48 M62 39h2",
  echo: "M22 32h9l10-9v26l-10-9h-9z M50 27q12 9 0 18 M59 21q19 15 0 30",
  moon: "M57 13A25 25 0 1 0 71 48A26 26 0 0 1 57 13Z M68 15v8m-4-4h8",
  nest: "M14 40Q43 74 76 40Q43 54 14 40Z M25 47q19 12 41 0 M30 39q-4-17 5-18q10 1 8 19 M45 40q-2-14 5-15q9 0 9 14",
  circuit: "M8 53H26V22H39L43 16L48 28L54 16L60 28L65 22H79V53H64 M63 41V65 M56 46V60 M55 53H8",
  field: Array.from({length: 13}, (_, i) => {
    const y = 7 + i * 5;
    return `M6 ${y} Q32 ${y - 16} 45 35 T84 ${y}`;
  }).join(" "),
  charge: "M8 60H82 M9 60V9 M11 58C24 24 39 14 78 12 M11 58C26 36 42 25 78 23 M11 58C24 46 45 36 78 33",
  wave: Array.from({length: 7}, (_, i) =>
    `M3 ${35+i*2} C18 ${-12+i*2} 31 ${-12+i*2} 45 ${33+i*2} S72 ${79+i*2} 88 ${31+i*2}`
  ).join(" "),
  samples: Array.from({length: 13}, (_, i) =>
    `M${8+i*6} 58 V${35-22*Math.sin(i*.6)}`
  ).join(" "),
  trace: "M3 40H17L20 36L23 46L26 40H34L40 12L47 63L54 30L60 40H70L75 33L79 41H89"
};

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

function makeCover(book) {
  const button = element("button", "volume " + book.binding);
  button.type = "button";
  if (book.pocket) button.classList.add("pocket");
  button.setAttribute("aria-label", "Read " + book.title);
  button.setAttribute("aria-haspopup", "dialog");
  const body = element("span", "book-body");
  body.setAttribute("aria-hidden", "true");
  const face = element("span", "book-face");
  const figure = document.createElementNS(ns, "svg");
  figure.setAttribute("viewBox", "0 0 90 72");
  figure.setAttribute("class", "cover-figure");
  const path = document.createElementNS(ns, "path");
  path.setAttribute("d", motifs[book.motif]);
  figure.append(path);
  face.append(element("span", "cover-title", book.title), figure);
  body.append(element("span", "book-back"), element("span", "book-edge"),
    element("span", "book-head"), element("span", "book-spine"), face);
  button.append(body);
  return button;
}

let current;
let page = 0;
let opener;
function showPage() {
  const [heading, ...paragraphs] = current.chapters[page];
  document.querySelector("#chapter-title").textContent = heading;
  document.querySelector("#chapter-text").replaceChildren(...paragraphs.map(text => element("p", "", text)));
  number.textContent = `Page ${page + 1} of ${current.chapters.length}`;
  previous.disabled = page === 0;
  next.disabled = page === current.chapters.length - 1;
  leaf.scrollTop = 0;
}

function openBook(book, shelf, button) {
  current = book;
  opener = button;
  page = 0;
  document.querySelector("#reader-title").textContent = book.title;
  document.querySelector("#reader-shelf").textContent = shelf;
  document.querySelector("#reader-subtitle").textContent = book.subtitle;
  reader.className = book.binding;
  showPage();
  reader.showModal();
  document.body.classList.add("reading");
}

function turn(delta) {
  const target = page + delta;
  if (target < 0 || target >= current.chapters.length) return;
  page = target;
  const oldFocus = document.activeElement;
  showPage();
  if (oldFocus === previous && previous.disabled) next.focus();
  if (oldFocus === next && next.disabled) previous.focus();
  if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
    leaf.animate([
      { transform: `perspective(800px) rotateY(${delta * -9}deg)`, opacity: .55 },
      { transform: "perspective(800px) rotateY(0deg)", opacity: 1 }
    ], { duration: 230, easing: "ease-out" });
  }
}

for (const shelf of shelves) {
  const row = element("section", "shelf");
  const label = element("h3", "shelf-label", shelf.name);
  const group = element("div", "book-row");
  for (const book of shelf.books) {
    const button = makeCover(book);
    button.addEventListener("click", () => openBook(book, shelf.name, button));
    group.append(button);
  }
  row.append(group, label);
  cabinet.append(row);
}
previous.addEventListener("click", () => turn(-1));
next.addEventListener("click", () => turn(1));
document.querySelector("#close-book").addEventListener("click", () => reader.close());
reader.addEventListener("keydown", event => {
  if (event.altKey || event.ctrlKey || event.metaKey) return;
  if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
    event.preventDefault();
    turn(event.key === "ArrowLeft" ? -1 : 1);
  }
});
reader.addEventListener("close", () => {
  document.body.classList.remove("reading");
  opener?.focus({ preventScroll: true });
});
