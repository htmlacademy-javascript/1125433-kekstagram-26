import {posts} from './data.js';


const pictures = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const photoData = posts();

const picturesPart = document.createDocumentFragment();

photoData.forEach(({url, comments, likes}) => {
  const pictureElem = pictureTemplate.cloneNode(true);
  pictureElem.querySelector('.picture__img').src = url;
  pictureElem.querySelector('.picture__comments').textContent = comments.length;
  pictureElem.querySelector('.picture__likes').textContent = likes;
  picturesPart.appendChild(pictureElem);
});
pictures.appendChild(picturesPart);


