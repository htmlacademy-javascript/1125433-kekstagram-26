import {getRandomArrayElement, getRandomPositiveInteger} from './utils.js';
import {descriptions, comments, names} from './const.js';


const ARRAY_LENGTH = 25;
const startId = {
  id: 0,
  img: 0,
  posts: 0,
};
const getId = (key) => {
  startId[key] += 1;
  return startId[key];
};

const createComment = function () {
  return {
    id: getId('id'),
    avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
    message: getRandomArrayElement(comments),
    name: getRandomArrayElement(names),
  };
};

const createPost = function () {
  return {
    id: getId('posts'),
    url: `photos/${getId('img')}.jpg`,
    description: getRandomArrayElement(descriptions),
    likes: getRandomPositiveInteger(15, 200),
    comments: Array.from(
      { length: getRandomPositiveInteger(1, 3) },
      createComment
    ),
  };
};

const posts = () => Array.from({ length: ARRAY_LENGTH }, createPost);
export {posts};
