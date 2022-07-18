export const getNeighboursIndices = (idx, cols, proximity) => {
  // neighbours 1-8
  //   n1 n2 n3
  //   n4 c  n5
  //   n6 n7 n8
  // calculate neighbours' indice
  const n1 = idx - cols - 1;
  const n2 = idx - cols;
  const n3 = idx - cols + 1;
  const n4 = idx - 1;
  const n5 = idx + 1;
  const n6 = idx + cols - 1;
  const n7 = idx + cols;
  const n8 = idx + cols + 1;
  return [n1, n2, n3, n4, n5, n6, n7, n8];
};

export const getValidNeighboursIndices = (rows, idx, cols, proximity = 1) => {
  const neighbours = getNeighboursIndices(idx, cols, proximity);
  const validNeighbours = neighbours.map((n) => n >= 0 && n < cols * rows);
  return validNeighbours;
};

export const getNumofLiveNeighbours = (idx, cols, board) => {
  const liveNeighbours = getNeighboursIndices(idx, cols).filter(
    (n) => board[n]
  );

  return liveNeighbours.length;
};

// calculate if the cell is dead or live in the next generation
export const getNextGen = (alive, numofLiveNeighbours) => {
  // Four rules of fate:
  /* Any live cell with fewer than two live neighbours dies, as if by underpopulation.
Any live cell with two or three live neighbours lives on to the next generation.
Any live cell with more than three live neighbours dies, as if by overpopulation.
Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
*/
  if (alive) {
    return numofLiveNeighbours < 2
      ? false
      : numofLiveNeighbours === 2 || numofLiveNeighbours === 3
      ? true
      : false;
  } else {
    return numofLiveNeighbours === 3 ? true : false;
  }
};
