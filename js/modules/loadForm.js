import{ sendData} from './apiWork.js';
import {isEscapeKey} from './utils.js';
import {openModal, closeModal} from './modal.js';
import {showStatusPop} from './statusPopup.js';

const HASH_NUMBER = 5;
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const uploadForm = document.querySelector('.img-upload__form');
const fileInput  = uploadForm.querySelector('#upload-file');
const uploadOverlay  = uploadForm.querySelector('.img-upload__overlay');
const uploadFormClose  = uploadForm.querySelector('#upload-cancel');
const hashInput  = uploadForm.querySelector('.text__hashtags');
const regExpHash = /^#[A-Za-zА-ЯаяЁё0-9]{1,19}$/;
const formSubmit = uploadForm.querySelector('.img-upload__submit');
const imageElement = uploadForm.querySelector('.img-upload__preview img');
const previewElement = uploadForm.querySelectorAll('.effects__preview');

const resetForm = () => uploadForm.reset();

const getHash = () => hashInput.value.split(' ').filter(Boolean);

const checkHashSymbols = () => getHash().every((item) => regExpHash.test(item));

const checkUniqHash = () => {
  const hash = getHash().map((item) => item.toLowerCase());
  const uniqueHash = new Set(hash);
  return hash.length === uniqueHash.size;
};

const checkHashCount = () => getHash().length <= HASH_NUMBER;

const pristine = new Pristine(uploadForm, {
  classTo: 'text__field-wrapper',
  errorClass: 'text__field-wrapper--invalid',
  successClass: 'text__field-wrapper--valid',
  errorTextParent: 'text__field-wrapper',
  errorTextTag: 'p',
  errorTextClass: 'text__error-message'
});

pristine.addValidator(hashInput, checkHashSymbols, 'Хэш-тег должен начинаться с символа #, содержать только буквы и числа. Максимальная длина одного хэш-тега 20 символов.', 1, true);
pristine.addValidator(hashInput, checkUniqHash, 'Хэш-теги не должны повторяться. Хэштеги нечувствительны к регистру.', 2, true);
pristine.addValidator(hashInput, checkHashCount, `Можно указать не более ${HASH_NUMBER} хэш-тегов.`, 3, true);

fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((extension) => fileName.endsWith(extension));

  if (matches) {
    const objectUrl = URL.createObjectURL(file);
    imageElement.src = objectUrl;

    previewElement.forEach((element) => {
      element.style.backgroundImage = `url(${objectUrl})`;
    });
  }
  openModal(uploadOverlay);
});

const blockSubmit = () => {
  formSubmit.disabled = true;
  formSubmit.textContent = 'Загружаю...';
};

const unblokSubmit = () => {
  formSubmit.disabled = false;
  formSubmit.textContent = 'Загрузить';
};

uploadFormClose.addEventListener('click', () => {
  closeModal();
  resetForm();
});

uploadOverlay.addEventListener('keydown', (evt) => {
  const targetTextFieldElement = evt.target.matches('.text__hashtags') || evt.target.matches('.text__description');
  if (targetTextFieldElement) {
    if (isEscapeKey(evt)) {
      evt.stopPropagation();
    }
  }
});

const onSuccess = () => {
  closeModal();
  unblokSubmit();
  showStatusPop('success');
};

const onError = () => {
  showStatusPop('error');
  unblokSubmit();
};

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    blockSubmit();
    sendData(
      () => onSuccess(),
      () => onError(),
      new FormData(evt.target),
    );
  }
});

fileInput.addEventListener('change', fileInput);
uploadForm.addEventListener('submit', uploadForm);

export { pristine, resetForm };
