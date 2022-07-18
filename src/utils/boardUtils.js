export const getInit = (cols, rows) => {
  const bd = Array(cols * rows).fill(false);
  bd[156] = true;
  bd[157] = true;
  bd[158] = true;
  bd[234] = true;
  bd[233] = true;
  bd[236] = true;
  return bd;
};

export const getEmptyBd = (cols, rows) => Array(cols * rows).fill(false);

export const randomiseBd = (bd, numofLiveCells, cols, rows) => {
  for (let index = 0; index < numofLiveCells; index++) {
    const j = Math.floor(Math.random() * cols * rows);
    bd[j] = true;
  }
};

export const getInitRan = (cols, rows, numofLiveCells) => {
  const bd = Array(cols * rows).fill(false);
  randomiseBd(bd, numofLiveCells, cols, rows);
  return bd;
};
