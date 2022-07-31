import {renderPicture} from './getBigPicture.js';


const pictures = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesPart = document.createDocumentFragment();

let photosArr = [];

function renderPictures(photos) {
  photos.forEach(({ id, url, comments, likes }) => {
    const pictureElem = pictureTemplate.cloneNode(true);
    pictureElem.dataset.photoId = id;
    pictureElem.querySelector('.picture__img').src = url;
    pictureElem.querySelector('.picture__comments').textContent = comments.length;
    pictureElem.querySelector('.picture__likes').textContent = likes;
    picturesPart.appendChild(pictureElem);

  });
  photosArr = photos;
  pictures.appendChild(picturesPart);
}

pictures.addEventListener('click', (evt) => {
  const eventElement = evt.target.closest('.picture');
  if (eventElement) {
    evt.preventDefault();
    const photoId = eventElement.dataset.photoId;
    const photo = photosArr.find((element) => element.id === Number(photoId));
    if (photo) {
      renderPicture(photo);
    }
  }
});

const clearPictures = () => {
  pictures.querySelectorAll('.picture').forEach((eventElement) => {
    eventElement.remove();
  });
};

export {renderPictures, clearPictures};
