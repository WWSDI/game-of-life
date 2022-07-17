export const randomIntInRange = ([floor, range]) =>
  Math.ceil(floor + Math.random() * range + 1);

export const liveCellStyle = (color) => {
  if (typeof color === "string") return { background: color };
  
  const { red, green, blue } = color;
  console.log(`rgb( ${randomIntInRange(red)}, ${randomIntInRange(green)}, ${randomIntInRange(blue)})`);
  return {
    background: `rgb( ${randomIntInRange(red)}, ${randomIntInRange(green)}, 
  ${randomIntInRange(blue)})`,
  };
};

export const deadCellStyle = (color) => {
  if (typeof color === "string") return { background: color };

  const [red, green, blue, alpha] = color;
  return {
    background: `rgba( ${red}, ${green}, ${blue}, ${alpha} )`,
  };
};

export const selectTheme = (themes, theme, value) =>
  value ? liveCellStyle(themes[theme].live) : deadCellStyle(themes[theme].dead);