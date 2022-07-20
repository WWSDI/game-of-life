export const getVerticalStripe = (cols, rows, stripWidth = 3) => {
  const boardHalfWidth = Math.floor(cols / 2);
  const widthFactor = Math.floor(stripWidth / 2);

  return Array.from({ length: cols * rows }, (v, i) => {
    if (
      i % cols >= boardHalfWidth - widthFactor &&
      i % cols <= boardHalfWidth + widthFactor
    )
      return true;
    else return false;
  });
};

export const get2VerticalStripes = (cols, rows, stripWidth = 3) => {
  const boardHalfHeight = Math.floor(rows / 2);
  const widthFactor = Math.floor(stripWidth / 2);

  return Array.from({ length: cols * rows }, (v, i) => {
    if (
      i % rows >= boardHalfHeight - widthFactor &&
      i % rows <= boardHalfHeight + widthFactor
    )
      return true;
    else return false;
  });
};
