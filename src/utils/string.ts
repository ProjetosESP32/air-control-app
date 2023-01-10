export const getFirstLetters = (str: string) =>
  str
    .split(' ')
    .filter(value => value.length > 2)
    .reduce((acc, value) => acc + value[0].toUpperCase(), '')
