const body = document.querySelector("body");
const IMG_LINK = [
  "https://cdn.pixabay.com/photo/2014/12/15/17/16/pier-569314_1280.jpg",
  "https://cdn.pixabay.com/photo/2013/02/21/19/06/beach-84533_1280.jpg",
  "https://cdn.pixabay.com/photo/2018/06/27/17/48/fantasy-3502188_1280.jpg",
];
const IMG_NUMBER = IMG_LINK.length;
function paintImage(imgNumber) {
  const image = new Image();
  image.src = IMG_LINK[imgNumber];
  image.classList.add("bgImage");
  body.appendChild(image);
}

function genRandom() {
  const number = Math.floor(Math.random() * IMG_NUMBER);
  return number;
}

function init() {
  const randomNumber = genRandom();
  paintImage(randomNumber);
}

init();
