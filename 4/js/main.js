
const descriptions = [
  'desc1','desc2','desc3','desc4','desc5','desc6','desc7','desc8','desc9','desc10','desc11','desc12','desc13','desc14','desc15','desc16','desc17','desc18','desc19','desc20','desc21','desc22',
];
const comments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.' ,
  'Как можно было поймать такой неудачный момент?!'
];
const names = [
  'Ольга',
  'Святослав',
  'Глеб',
  'Максим',
  'Николай',
  'Ирина',
  'Павел',
  'Виктор',
  'Алла',
  'Михаил',
  'Григорий',
  'Инна',
  'Софья',
  'Марина',
  'Арсений',
  'Милена',
  'Лариса',
  'Дина',
  'Валерий',
  'Руслан'
];
const ARRAY_LENGTH = 25;
const startId = {
  id:0,
  img:0,
  posts:0
};
const getId =(key) => {
  startId[key] +=1;
  return startId[key];
};

function getRandomPositiveInteger (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}
const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

// function checkStringLength (string, length) {
//   return string.length <= length;
// }

const createComment = function () {
  return {
    id:getId('id'),
    avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
    message: getRandomArrayElement(comments),
    name: getRandomArrayElement(names)
  };
};

const createObj = function() {
  return {
    id: getId('posts'),
    url: `photos/${getId('img')}.jpg`,
    description: getRandomArrayElement(descriptions),
    likes:getRandomPositiveInteger(15, 200),
    comments: Array.from({length:getRandomPositiveInteger(1, 3)}, createComment)
  };
};


// eslint-disable-next-line no-unused-vars
const objects = Array.from({length: ARRAY_LENGTH}, createObj);
