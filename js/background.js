const body = document.querySelector("body");
const IMG_LINK = [
  "https://cdn.pixabay.com/photo/2013/11/28/10/03/autumn-219972_1280.jpg",
  "https://cdn.pixabay.com/photo/2016/01/09/18/28/old-1130743_1280.jpg",
  "https://cdn.pixabay.com/photo/2016/08/09/21/54/yellowstone-national-park-1581879_1280.jpg",
  "https://cdn.pixabay.com/photo/2015/09/01/06/17/milky-way-916523_1280.jpg",
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
