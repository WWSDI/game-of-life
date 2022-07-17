// calculate cell's column index based on its index
// getCol probably should have been named as getY wherein Y means index on Y-axis
const getCol = (idx, cols) => idx % cols;
const getRow = (idx, cols) => Math.floor(idx / cols);

export const hasTopRow = (idx, cols) => {
  return getRow(idx, cols) !== 0 ? true : false;
};
export const hasBottomRow = (idx, cols, rows) => {
  return getRow(idx, cols) !== rows - 1 ? true : false;
};
export const hasLeftCol = (idx, cols) => {
  return getCol(idx, cols) !== 0 ? true : false;
};
export const hasRightCol = (idx, cols) => {
  return getCol(idx, cols) !== cols - 1 ? true : false;
};

export const getNumofLiveNeighbours = (board, neighbours) => {
  const state = neighbours.map((n) => board[n]);
  const numofLiveNeighbours = state.filter((s) => s === true).length;
  return numofLiveNeighbours;
};

// calculate if the cell is dead or live in the next generation
export const getFate = (live, numofLiveNeighbours) => {
  // Four rules of fate:
  /* Any live cell with fewer than two live neighbours dies, as if by underpopulation.
Any live cell with two or three live neighbours lives on to the next generation.
Any live cell with more than three live neighbours dies, as if by overpopulation.
Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
*/
  if (live) {
    return numofLiveNeighbours < 2
      ? false
      : numofLiveNeighbours === 2 || numofLiveNeighbours === 3
      ? true
      : false;
  } else {
    return numofLiveNeighbours === 3 ? true : false;
  }
};

export const getNeighbours_nonMemo = (idx, cols, rows) => {
  // neighbours 1-8
  //   n1 n2 n3
  //   n4 c  n4
  //   n6 n7 n8
  const n1 = idx - cols - 1;
  const n2 = idx - cols;
  const n3 = idx - cols + 1;
  const n4 = idx - 1;
  const n5 = idx + 1;
  const n6 = idx + cols - 1;
  const n7 = idx + cols;
  const n8 = idx + cols + 1;

  // rows & cols
  const topRow = [n1, n2, n3];
  const bottomRow = [n6, n7, n8];
  const leftCol = [n1, n4, n6];
  const rightCol = [n3, n5, n8];

  const nonNeighbours = [
    !hasTopRow(idx, cols) ? topRow : null,
    !hasBottomRow(idx, cols, rows) ? bottomRow : null,
    !hasLeftCol(idx, cols) ? leftCol : null,
    !hasRightCol(idx, cols) ? rightCol : null,
  ];
  const falseNeightbours = nonNeighbours.flat().filter((i) => i !== null);

  const neighbours = [
    [n1, n2, n3, n4, n5, n6, n7, n8].filter(
      (n) => !falseNeightbours.includes(n)
    ),
  ];

  return neighbours.flat();
};
