export const getRandomNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

export const getRandomArrayItem = (array) => {
  const randomIndex = getRandomNumber(0, array.length);
  return array[randomIndex];
};

export const getRandomFloat = (min, max) => {
  let number = Math.random() * (max - min) + min;
  return number.toFixed(1);
};

export const getRandomTime = () => {
  const start = new Date("January 01 1900");
  const end = new Date();
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

export const getRandomBoolean = () => {
  return Math.random() >= 0.5;
};

export const getSomeItems = (min, max, array) => {
  const length = getRandomNumber(min, max);
  const count = array.length - 1;
  let result = [];
  for (let i = 0; i < length; i += 1) {
    let j = getRandomNumber(0, count);
    result.push(array[j]);
  }
  return result;
};

export const createFishText = (min, max, array) => {
  const length = getRandomNumber(min, max);
  const count = array.length - 1;
  let result = [];
  for (let i = 0; i < length; i += 1) {
    let j = getRandomNumber(0, count);
    result.push(array[j]);
  }
  return result.join(` `);
};

export const cutText = (text, max) => {
  let result = text.split(``).slice(0, max).join(``);
  return `${result}...`;
};

export const formatDuration = (time) => {
  const hours = Math.floor(time / 60);
  const minutes = time % 60;
  const text = hours != 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  return text;
};

export const makeControlLink = (name) => {
  let array = name.split(` `);
  return name === `Add to favorites` ? `favorite` : array[array.length - 1].toLowerCase();
};
