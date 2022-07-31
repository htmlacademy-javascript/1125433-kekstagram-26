import{isEscapeKey} from './utils.js';
import {resetForm, pristine} from './loadForm.js';
import { clearCommentsListCounter} from './getBigPicture.js';
import {resetImageScale} from './scale.js';
import {resetEffect} from './effect.js';

let targetElement;

const openModal = (item) => {
  targetElement = item;
  document.body.classList.add('modal-open');
  targetElement.classList.remove('hidden');
  document.addEventListener('keydown', modalEscKeydownHandler);
};

const closeModal = () => {
  document.body.classList.remove('modal-open');
  targetElement.classList.add('hidden');
  document.removeEventListener('keydown', modalEscKeydownHandler);
  if (targetElement.classList.contains('img-upload__overlay')) {
    pristine.reset();
    resetForm();
    resetImageScale();
    resetEffect();
  }

  if (targetElement.classList.contains('big-picture')) {
    clearCommentsListCounter();
  }
};

function modalEscKeydownHandler(evt) {
  if (isEscapeKey(evt)) {
    if (evt.target.matches('.text__hashtags') || evt.target.matches('.text__description') || document.querySelector('.error')) {
      return;
    }

    evt.preventDefault();
    closeModal();
  }
}


export { openModal, closeModal };


