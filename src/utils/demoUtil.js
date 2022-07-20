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

// This one potentially has some problem, can only be used for 80*40 widescreen format
export const get2VerticalStripes = (cols, rows, stripWidth = 3) => {
  const boardHalfWidth = Math.floor(rows / 2);
  const widthFactor = Math.floor(stripWidth / 2);

  return Array.from({ length: cols * rows }, (v, i) => {
    if (
      i % rows >= boardHalfWidth - widthFactor &&
      i % rows <= boardHalfWidth + widthFactor
    )
      return true;
    else return false;
  });
};

export const getHorizontalStripe = (cols, rows, stripWidth = 3) => {
  const boardHalfHeight = Math.floor(rows / 2);
  const widthFactor = Math.floor(stripWidth / 2);

  return Array.from({ length: cols * rows }, (v, i) => {
    if (
      i / cols >= boardHalfHeight - widthFactor - 1 &&
      i / cols < boardHalfHeight + widthFactor
    )
      return true;
    else return false;
  });
};

export const getCross = (cols, rows, stripWidth = 3) => {
  const bd1 = getVerticalStripe(cols, rows, stripWidth);
  const bd2 = getHorizontalStripe(cols, rows, stripWidth);

  return bd1.map((cell, i) => (cell || bd2[i] ? true : false));
};

export const getSquare = (cols, rows, stripWidth = 3) => {
  const bd1 = getVerticalStripe(cols, rows, stripWidth);
  const bd2 = getHorizontalStripe(cols, rows, stripWidth);

  return bd1.map((cell, i) => (cell && bd2[i] ? true : false));
};

export const newShape = (cols, rows, stripWidth = 3) => {
  const boardHalfHeight = Math.floor(rows / 2);
  const widthFactor = Math.floor(stripWidth / 2);

  return Array.from({ length: cols * rows }, (v, i) => {
    if (
      (i / cols >= boardHalfHeight - widthFactor - 1 &&
        i / cols < boardHalfHeight + widthFactor) ||
      (i % rows >= boardHalfHeight - widthFactor &&
        i % rows <= boardHalfHeight + widthFactor)
    )
      return true;
    else return false;
  });
};
