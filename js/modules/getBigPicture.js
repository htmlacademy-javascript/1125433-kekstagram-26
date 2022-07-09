const AVATAR_WIDTH = 35;
const AVATAR_HEIGHT = 35;

const postModalElement = document.querySelector('.big-picture');
const commentsListElement = postModalElement.querySelector('.social__comments');

const commentCountElement = postModalElement.querySelector('.social__comment-count');
commentCountElement.classList.add('hidden');
const commentsLoaderElement = postModalElement.querySelector('.comments-loader');
commentsLoaderElement.classList.add('hidden');

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

const clearCommentsList = () => {
  commentsListElement.innerHTML = '';
};

const renderComments = (comments) => {
  const commentsListFragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    commentsListFragment.append(createCommentItem(comment));
  });
  clearCommentsList();
  commentsListElement.append(commentsListFragment);
};

const renderPicture = ({ url, description, comments, likes }) => {
  postModalElement.querySelector('.big-picture__img img').src = url;
  postModalElement.querySelector('.social__caption').textContent = description;
  postModalElement.querySelector('.likes-count').textContent = likes;
  postModalElement.querySelector('.comments-count').textContent = comments.length;
  renderComments(comments);
};

export { renderPicture };
