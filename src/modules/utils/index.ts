export const stringFormat = (str: string, ...val: any[]) => {
  for (let index = 0; index < val.length; index++) {
    str = str.replace(`{${index}}`, val[index]);
  }
  return str;
};

export const isArrayEquals = (array1: Array<any>, array2: Array<any>) => {
  return JSON.stringify(array1) === JSON.stringify(array2)
}

export const shuffle = (array: Array<any>) => {
  let currentIndex = array.length, randomIndex;
  const shuffledArray = [...array]

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [shuffledArray[currentIndex], shuffledArray[randomIndex]] = [
      shuffledArray[randomIndex], shuffledArray[currentIndex]];
  }

  if (isArrayEquals(array, shuffledArray)) {
    const reShuffledArray = shuffle(array)
    return reShuffledArray
  }
  else
    return shuffledArray;
}