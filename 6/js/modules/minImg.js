import {posts} from './data.js';


const pictures = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const photoData = posts();

const picturesPart = document.createDocumentFragment();

photoData.forEach(({url, comments, likes}) => {
  const pictureElem = pictureTemplate.cloneNode(true);
  pictureTemplate.querySelector('.picture__img').src = url;
  pictureTemplate.querySelector('.picture__comments').textContent = comments.length;
  pictureTemplate.querySelector('.picture__likes').textContent = likes;
  picturesPart.appendChild(pictureElem);
});
pictures.appendChild(picturesPart);


