import { EscapeKey } from './utils.js';

const Z_ORDER = 10;

const body = document.body;
const successTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');
const errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

const showStatusPop = (type) => {
  const statusConfig = {
    'success': successTemplate,
    'error': errorTemplate,
  };

  const template = statusConfig[type];
  const popupElement = template.cloneNode(true);
  const closeElement = popupElement.querySelector(`.${type}__button`);
  popupElement.style.zIndex = Z_ORDER;

  body.append(popupElement);

  const onPopupEscKeydown = (evt) => {
    if (EscapeKey(evt)) {
      closeStatusPopup();
    }
  };

  const onBackdropClick = (evt) => {
    if (evt.target.closest(`.${type}__inner`)) {
      return;
    }
    closeStatusPopup();
  };

  closeElement.addEventListener('click', () => {
    closeStatusPopup();
  });

  document.addEventListener('keydown', onPopupEscKeydown);
  document.addEventListener('click', onBackdropClick);

  function closeStatusPopup() {
    popupElement.remove();
    document.removeEventListener('keydown', onPopupEscKeydown);
    document.removeEventListener('click', onBackdropClick);
  }
};

export { showStatusPop };
