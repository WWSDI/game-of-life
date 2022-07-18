import { useState } from "react";
import "./App.css";
import Board from "./components/Board";
import Control from "./components/Control";
import Setting from "./components/Setting";
import { getInitRan } from "./utils/boardUtils";

function App() {
  const [generation, setGeneration] = useState(1);
  // default cols * rows = 40 * 30
  // const [cols, setCols] = useState(40);
  // const [rows, setRows] = useState(40);
  const [[cols,rows], setColsRows] = useState([40,40]);
  const [start, setStart] = useState(false);
  const [seed, setSeed] = useState(800);
  const [speed, setSpeed] = useState(700);
  // a possible way to improve performance is to use object intead of boolean for cell value
  const [board, setBoard] = useState(getInitRan(cols, rows, seed));
  const [theme, setTheme] = useState("vividRainbow");

  return (
    <div className="App">
      <header>
        <h1>
          <span>
            <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">
              Game of Life
            </a>
          </span>
        </h1>
        <h2>Shawn's Implementation</h2>
      </header>
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
        seed={seed}
        theme={theme}
      />
      <Control
        cols={cols}
        setColsRows={setColsRows}
        rows={rows}
        // setRows={setRows}
        speed={speed}
        setSpeed={setSpeed}
        seed={seed}
        setSeed={setSeed}
        start={start}
        setStart={setStart}
        generation={generation}
        setGeneration={setGeneration}
        setBoard={setBoard}
        theme={theme}
        setTheme={setTheme}
      />
    </div>
  );
}

export default App;
