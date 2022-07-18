import { useEffect, useRef } from "react";
import Cell from "./Cell";
import styles from "./board.module.css";
import {
  getNumofLiveNeighbours,
  getNextGen,
  getNeighboursIndices,
  getValidNeighboursIndices,
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
  theme,
  step,
  setStep,
}) {
  const handleClick = (e) => {
    const { value: idx } = e.target.attributes.idx;

    const newValue = !board[idx];
    const newBoard = [...board];
    newBoard[idx] = newValue;
    setBoard(newBoard);
  };

  const handleDraw = (e) => {
    const idx = Number(e.target.attributes.idx.value);
    // normal stroke
    if (e.ctrlKey && !e.metaKey) {
      if (board[idx]) return;

      const newBoard = [...board];
      newBoard[idx] = true;
      setBoard(newBoard);
    }

    // wide stroke
    if (e.altKey) {
      const newBoard = [...board];
      newBoard[idx] = true;

      const neighbours = getValidNeighboursIndices(rows, idx, cols);
      // console.log(neighbours);
      neighbours.forEach((n) => (newBoard[n] = true));
      setBoard(newBoard);
    }

    // erase with normal/wide stroke
    if (e.metaKey) {
      const newBoard = [...board];
      newBoard[idx] = false;

      // hold both ctrl and meta key to apply normal stroke erasing
      if (!e.ctrlKey) {
        const neighbours = getValidNeighboursIndices(rows, idx, cols);
        // console.log(neighbours);
        neighbours.forEach((n) => (newBoard[n] = false));
      }

      setBoard(newBoard);
    }
  };

  // for stepping
  //感覺這裡好像很適合寫成custom hook，可以試試看
  // useRef() is used for saving remaining render count between renders, so that this useEffect hook doesn't over render (it renders twice due to update delay of step state)
  const savedCount = useRef(0);
  useEffect(() => {
    if (step) {
      savedCount.current += 1;
    }

    const newBoard = board.map((alive, i) =>
      getNextGen(alive, getNumofLiveNeighbours(i, cols, board))
    );

    if (savedCount.current >= 1) {
      setBoard(newBoard);
      setGeneration((gen) => gen + 1);
      savedCount.current -= 1;
      console.log("<Board>: render next gen");
    }

    return () => setStep(false);
  }, [step]);

  // for normal start/stop
  useEffect(() => {
    console.log("<Board>: useEffect");

    if (!start) return;

    const newBoard = board.map((alive, i) =>
      getNextGen(alive, getNumofLiveNeighbours(i, cols, board))
    );

    const id = setTimeout(() => {
      if (start) {
        setBoard(newBoard);
        setGeneration((gen) => gen + 1);
        console.log("<Board>: render next gen");
      }
    }, 1000 - speed);

    return () => clearTimeout(id);
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
