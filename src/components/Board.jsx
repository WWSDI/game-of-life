import { useEffect } from "react";
import Cell from "./Cell";
import styles from "./styles.module.css";

// Four rules:
/* Any live cell with fewer than two live neighbours dies, as if by underpopulation.
Any live cell with two or three live neighbours lives on to the next generation.
Any live cell with more than three live neighbours dies, as if by overpopulation.
Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.


*/
const getCol = (idx, cols) => idx % cols;
export const getRow = (idx, cols) => Math.floor(idx / cols);
const hasTopRow = (idx, cols, rows) => {
  return getRow(idx, cols, rows) !== 0 ? true : false;
};
const hasBottomRow = (idx, cols, rows) => {
  return getRow(idx, cols, rows) !== rows - 1 ? true : false;
};
const hasLeftCol = (idx, cols, rows) => {
  return getCol(idx, cols, rows) !== 0 ? true : false;
};
const hasRightCol = (idx, cols, rows) => {
  return getCol(idx, cols, rows) !== cols - 1 ? true : false;
};
const getNeighbours = (idx, cols, rows) => {
  // neighbours 1-8
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

  const notNeighbours = [
    !hasTopRow(idx, cols, rows) ? topRow : null,
    !hasBottomRow(idx, cols, rows) ? bottomRow : null,
    !hasLeftCol(idx, cols, rows) ? leftCol : null,
    !hasRightCol(idx, cols, rows) ? rightCol : null,
  ];
  const falseNeightbours = notNeighbours.flat().filter((i) => i !== null);

  const neighbours = [
    [n1, n2, n3, n4, n5, n6, n7, n8].filter(
      (n) => !falseNeightbours.includes(n),
    ),
  ];

  return neighbours.flat();
};

// return Number of Live Neighbours
const getNLN = (board, neighbours) => {
  const state = neighbours.map((n) => board[n]);
  const NLN = state.filter((s) => s === true).length;
  return NLN;
};
const getFate = (live, NLN, board) => {
  if (live) {
    return NLN < 2 ? false : NLN === 2 || NLN === 3 ? true : false;
  } else {
    return NLN === 3 ? true : false;
  }
};

export default function Board({
  board,
  setBoard,
  cols,
  rows,
  start,
  setStart,
  speed,
}) {
  const handleClick = ({ target: { attributes } }) => {
    const {
      idx: { value: idx },
    } = attributes;

    console.log("😃", idx);

    const newValue = !board[idx];
    const newBoard = [...board];
    newBoard[idx] = newValue;

    console.log("😃", getNeighbours(Number(idx), cols, rows));
    console.log("😃", "col", getCol(Number(idx), cols, rows));
    console.log("😃", "row", getRow(Number(idx), cols, rows));

    setBoard(newBoard);
  };

  useEffect(() => {
    console.log("🌸", start);
    setTimeout(() => {
      if (!start) return;
      const newBoard = board.map((live, i) =>
        getFate(live, getNLN(board, getNeighbours(i, cols, rows), board)),
      );
      setBoard(newBoard);
    }, speed);

    return () => {
      // setStart(false);
    };
  }, [start, board, cols, rows, setBoard, speed, setStart]);

  return (
    <div className={styles.board} id="board">
      {board.map((v, i) => {
        return <Cell key={i} handleClick={handleClick} value={v} idx={i} />;
      })}
    </div>
  );
}
