export const getRandomNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
}

export const getRandomArrayItem = (array) => {
  const randomIndex = getRandomNumber(0, array.length);
  return array[randomIndex];
}

export const getRandomFloat = (min, max) => {
  let number = Math.random() * (max - min) + min;
  return number.toFixed(1);
}

export const getRandomDate = () => {
  const targetDate = new Date();
  const sign = Math.random() > 0.5 ? 1 : -1;
  const diffValue = sign * getRandomNumber(0, 8);
  targetDate.setDate(targetDate.getDate() + diffValue);
  return targetDate;
}

export const createFishText = (min, max, array) => {
  const length = getRandomNumber(min, max);
  const count = array.length - 1;
  let result = [];
  for (let i = 0; i < length; i += 1) {
    let j = getRandomNumber(0, count);
    result.push(array[j]);
  }
  return result.join(' ');
}

export const cutText = (text, max) => {
  let result = text.split(``).slice(0, max).join(``);
  return `${result}...`;
};

export const formatDuration = (time) => {

}
