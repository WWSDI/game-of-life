import { useState } from "react";
import "./App.css";
import Board from "./components/Board";
import Control from "./components/Control";

const getInit = (cols, rows) => {
  const bd = Array(cols * rows).fill(false);
  bd[156] = true;
  bd[157] = true;
  bd[158] = true;
  bd[234] = true;
  bd[233] = true;
  bd[236] = true;
  return bd;
};
const randomise = (bd, numLiveCells, cols, rows) => {
  for (let index = 0; index < numLiveCells; index++) {
    const j = Math.floor(Math.random() * cols * rows);
    bd[j] = true;
  }
};
const getInitRan = (cols, rows, numLiveCells) => {
  const bd = Array(cols * rows).fill(false);
  randomise(bd, numLiveCells, cols, rows);
  return bd;
};

function App() {
  // default cols * rows = 40 * 30
  const [cols, setCols] = useState(40);
  const [rows, setRows] = useState(30);
  const [start, setStart] = useState(false);
  // const [delay, setDelay] = useState(100);
  const [board, setBoard] = useState(getInit(cols, rows));
  const [seed, setSeed] = useState(200);
  const [speed, setSpeed] = useState(100);
  const [draw, setDraw] = useState(false)

  const clickRandom = (seed) => {
    console.log("RANDOM");
    // const newBoard = getInitRan(cols, rows, seed);
    // console.log(newBoard);
    setBoard(getInitRan(cols, rows, seed));
  };

  const changeRes = () => {
    document.getElementById("board").style.gridTemplateColumns = "1rem ".repeat(
      cols,
    );
    setBoard(getInit(cols, rows))
  };

  return (
    <div className="App">
      {/* <Setting /> */}
      <Board
        board={board}
        setBoard={setBoard}
        cols={cols}
        rows={rows}
        start={start}
        setStart={setStart}
        speed={speed}
      />
      <Control
        cols={cols}
        setCols={setCols}
        rows={rows}
        setRows={setRows}
        speed={speed}
        setSpeed={setSpeed}
        seed={seed}
        setSeed={setSeed}
        start={start}
        setStart={setStart}
        clickRandom={clickRandom}
        changeRes={changeRes}
        draw={draw}
        setDraw={setDraw}
      />
    </div>
  );
}

export default App;
