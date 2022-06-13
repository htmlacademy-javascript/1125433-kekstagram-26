function getRandomIntInclusive(min, max) {

  min = Math.ceil(min);
  max = Math.floor(max);
  if(min < 0) {
    return 'значения меньше 0 не вводить';
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
// взято с сайта https://developer.mozilla.org/
function checkStringRange(string, maxStringAllowed) {
  if (string > maxStringAllowed) {
    return false;
  } return true;
}
getRandomIntInclusive(3, 4);
checkStringRange(33, 66);
