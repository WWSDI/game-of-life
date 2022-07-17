import { useEffect, useState } from "react";
import "./App.css";
import Board from "./components/Board";
import Control from "./components/Control";
import Setting from "./components/Setting";
import { getInitRan } from "./utils/boardUtils";

const useStateWithCallback = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const setValueAndCallback = (newValue, callback) => {
    setValue((prevValue) => {
      if (callback) {
        callback(prevValue, newValue);
      }
      return newValue;
    });
  };

  return [value, setValueAndCallback];
};

function App() {
  const [generation, setGeneration] = useState(1);
  // default cols * rows = 40 * 30
  const [cols, setCols] = useState(40);
  const [rows, setRows] = useState(30);
  const [start, setStart] = useState(false);
  // const [delay, setDelay] = useState(100);
  const [random, setRandom] = useState(false);
  const [seed, setSeed] = useState(800);
  const [speed, setSpeed] = useState(200);
  const [board, setBoard] = useState(getInitRan(cols, rows, seed));

  return (
    <div className="App">
      <Setting generation={generation} />
      <Board
        board={board}
        setBoard={setBoard}
        cols={cols}
        rows={rows}
        start={start}
        setStart={setStart}
        speed={speed}
        generation={generation}
        setGeneration={setGeneration}
        random={random}
        setRandom={setRandom}
        seed={seed}
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
        generation={generation}
        setGeneration={setGeneration}
        setBoard={setBoard}
      />
    </div>
  );
}

export default App;
