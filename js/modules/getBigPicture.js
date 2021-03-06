import { openModal, closeModal } from './modal.js';

const AVATAR_WIDTH = 35;
const AVATAR_HEIGHT = 35;

const COMMENTS_COUNT = 5;

const postModalElement = document.querySelector('.big-picture');
const postModalCloseElement = postModalElement.querySelector('.big-picture__cancel');
const postImageElement = postModalElement.querySelector('.big-picture__img img');
const socialCaptionElement = postModalElement.querySelector('.social__caption');
const likesCountElement = postModalElement.querySelector('.likes-count');
const commentsCountElement = postModalElement.querySelector('.comments-count');
const commentsListElement = postModalElement.querySelector('.social__comments');
const commentsShownCountElement = postModalElement.querySelector('.comments-shown-count');
const commentsLoaderElement = postModalElement.querySelector('.comments-loader');

let commentsData = [];
let commentsStartIndex = 0;
let commentsShownCount = 0;

const createCommentItem = ({ avatar, message, name }) => {
  const commentItem = document.createElement('li');
  commentItem.classList.add('social__comment');

  const userPicture = document.createElement('img');
  userPicture.classList.add('social__picture');
  userPicture.src = avatar;
  userPicture.alt = name;
  userPicture.width = AVATAR_WIDTH;
  userPicture.height = AVATAR_HEIGHT;
  commentItem.append(userPicture);

  const commentText = document.createElement('p');
  commentText.classList.add('social__text');
  commentText.textContent = message;
  commentItem.append(commentText);

  return commentItem;
};

const renderComments = () => {
  const comments = commentsData.slice(commentsStartIndex, commentsStartIndex + COMMENTS_COUNT);
  commentsStartIndex += COMMENTS_COUNT;

  const commentsListFragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    commentsListFragment.append(createCommentItem(comment));
  });

  commentsShownCount += comments.length;
  commentsShownCountElement.textContent = commentsShownCount;

  if (commentsShownCount >= commentsData.length) {
    commentsLoaderElement.classList.add('hidden');
  }
  commentsListElement.append(commentsListFragment);
};

const renderPicture = ({ url, description, comments, likes }) => {
  postImageElement.src = url;
  socialCaptionElement.textContent = description;
  likesCountElement.textContent = likes;
  commentsCountElement.textContent = comments.length;
  commentsLoaderElement.classList.remove('hidden');
  commentsListElement.innerHTML = '';
  commentsData = comments;
  renderComments();
  openModal(postModalElement);
};

const clearCommentsListCounter = () => {
  commentsStartIndex = 0;
  commentsShownCount = 0;
};

postModalCloseElement.addEventListener('click', () => {
  closeModal();
});

commentsLoaderElement.addEventListener('click', renderComments);

export { renderPicture, clearCommentsListCounter };
