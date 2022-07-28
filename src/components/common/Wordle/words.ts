export const boardDefault = (tries: number, length: number) =>
  [...Array(tries)].map(() => [...Array(length)].map(() => ""));

export const generateBoard = (tries: number, word: string) =>
  [...Array(tries)].map(() => word.split(""));
