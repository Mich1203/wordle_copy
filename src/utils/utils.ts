export const getRandomColor = () => {
  const h = Math.floor(Math.random() * 360),
    s = Math.floor(Math.random() * 100) + "%",
    l = Math.floor(Math.random() * 60) + "%"; // max value of l is 100, but I set to 60 cause I want to generate dark colors
  // (use for background with white/light font color)
  return `hsl(${h},${s},${l})`;
};

export const getAcronym = (str: string) =>
  str
    .split(/\s/)
    .reduce(
      (response, word) => (response += word.slice(0, 1).toUpperCase()),
      ""
    );

