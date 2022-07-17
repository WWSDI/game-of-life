import { useEffect, useRef } from "react";
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
  const getNeighbours = getNeighbours_nonMemo;
  const savedInterval = useRef();
  console.log("❤️", savedInterval);

  const handleClick = ({ target: { attributes } }) => {
    const { value: idx } = attributes.idx;

    const newValue = !board[idx];
    const newBoard = [...board];
    newBoard[idx] = newValue;
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
    if (!start) return () => {
      console.log("clearing set")
      clearInterval(savedInterval.current);
      savedInterval.current = null
    }

    savedInterval.current = setTimeout(() => {
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

    console.log("*** interval", savedInterval.current);

    // return ;
  }, [
    start,
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
