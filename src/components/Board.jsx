import { useEffect, useMemo } from "react";
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
  setGeneration,
}) {
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
    console.log("🌸");
    setTimeout(() => {
      if (!start) return;
      const newBoard = board.map((live, i) =>
        getFate(
          live,
          getNumofLiveNeighbours(
            board,
            getNeighbours_nonMemo(i, cols, rows),
            board
          )
        )
      );
      setBoard(newBoard);
      setGeneration((gen) => gen + 1);
    }, speed);

    return () => {
      // setStart(false);
    };
  }, [start, board, cols, rows, setBoard, speed, setStart, setGeneration]);

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
