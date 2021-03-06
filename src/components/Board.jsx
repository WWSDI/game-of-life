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
    const idx = e.target.attributes.idx.value;
    
    if (e.ctrlKey) {
      if (board[idx]) return;
      
      const newBoard = [...board];
      newBoard[idx] = true;
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
