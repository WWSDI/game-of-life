import { useEffect } from "react";
import Cell from "./Cell";
import styles from "./board.module.css";
import {
  getNumofLiveNeighbours,
  getFate,
  getNeighbours_nonMemo,
} from "../utils/cellUtils";

export default function Board({
  board,
  setBoard,
  cols,
  rows,
  start,
  setStart,
  speed,
  generation,
  setGeneration,
  random,
  setRandom,
  seed,
}) {
  const getNeighbours = getNeighbours_nonMemo;

  const handleClick = ({ target: { attributes } }) => {
    const {
      idx: { value: idx },
    } = attributes;

    const newValue = !board[idx];
    const newBoard = [...board];
    newBoard[idx] = newValue;
    // console.log("😃", "col", getCol(Number(idx), cols, rows));
    // console.log("😃", "row", getRow(Number(idx), cols, rows));
    setBoard(newBoard);
  };

  const handleMouseEnter = (e) => {
    const idx = e.target.attributes.idx.value;

    if (e.ctrlKey) {
      const newBoard = [...board];
      newBoard[idx] = !newBoard[idx];
      setBoard(newBoard);
    }
  };

  useEffect(() => {
    console.log("<Board>: useEffect");
    if (!start) return;

    setTimeout(() => {
      const newBoard = board.map((liveCell, i) =>
        getFate(
          liveCell,
          getNumofLiveNeighbours(board, getNeighbours(i, cols, rows), board)
        )
      );

      if (start) {
        setBoard(newBoard);
        setGeneration((gen) => gen + 1);
        console.log("<Board>: render next gen");
      }
    }, speed);
  }, [
    start,
    random,
    board,
    cols,
    rows,
    setBoard,
    speed,
    setStart,
    setGeneration,
    getNeighbours,
  ]);

  return (
    <div className={styles.board} id="board">
      {board.map((v, i) => {
        return (
          <Cell
            key={i}
            handleClick={handleClick}
            handleMouseEnter={handleMouseEnter}
            value={v}
            idx={i}
          />
        );
      })}
    </div>
  );
}
