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
    if (!start)
      return () => {
        console.log("clearing set");
        clearInterval(savedInterval.current);
        savedInterval.current = null;
      };

    savedInterval.current = setTimeout(() => {
      const newBoard = board.map((alive, i) =>
        getNextGen(alive, getNumofLiveNeighbours(i, cols, board))
      );

      if (start) {
        setBoard(newBoard);
        setGeneration((gen) => gen + 1);
        console.log("<Board>: render next gen");
      }
    }, speed);

    console.log("*** interval", savedInterval.current);

    // return ;
  }, [start, board, cols, rows, setBoard, speed, setStart, setGeneration]);

  return (
    <div
      className={styles.board}
      id="board"
      onClick={handleClick}
      // onMouseEnter={handleMouseEnter}
    >
      {board.map((v, i) => {
        return (
          <Cell
            key={i}
            handleMouseEnter={handleMouseEnter}
            value={v}
            idx={i}
            theme={theme}
          />
        );
      })}
    </div>
  );
}
