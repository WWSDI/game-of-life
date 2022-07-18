import { useEffect, useRef } from "react";
import Cell from "./Cell";
import styles from "./board.module.css";
import { getNumofLiveNeighbours, getNextGen } from "../utils/cellUtils";

export default function Board({
  board,
  setBoard,
  cols,
  rows,
  start,
  setStart,
  speed,
  setGeneration,
  theme,
}) {
  const savedInterval = useRef();
  // console.log("❤️", savedInterval);

  const handleClick = (e) => {
    const { value: idx } = e.target.attributes.idx;

    const newValue = !board[idx];
    const newBoard = [...board];
    newBoard[idx] = newValue;
    setBoard(newBoard);
  };

  const handleDraw = (e) => {
    const idx = e.target.attributes.idx.value;

    if (e.ctrlKey) {
      if (board[idx]) return;

      const newBoard = [...board];
      newBoard[idx] = true;
      setBoard(newBoard);
    }
  };

  useEffect(() => {
    console.log("<Board>: useEffect");
    if (!start) return;

    const newBoard = board.map((alive, i) =>
      getNextGen(alive, getNumofLiveNeighbours(i, cols, board))
    );

    setTimeout(() => {
      if (start) {
        setBoard(newBoard);
        setGeneration((gen) => gen + 1);
        console.log("<Board>: render next gen");
      }
    }, 1000 - speed);
  }, [start, board]);

  return (
    <div className={styles.board} id="board" onClick={handleClick}>
      {board.map((v, i) => {
        return (
          <Cell
            key={i}
            handleDraw={handleDraw}
            value={v}
            idx={i}
            theme={theme}
          />
        );
      })}
    </div>
  );
}
