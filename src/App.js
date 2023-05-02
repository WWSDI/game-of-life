import { useRef, useState } from "react";
import "./App.css";
import Board from "./components/Board";
import Control from "./components/Control";
import Info from "./components/Info";
import Header from "./components/Header";
import { getInitRan } from "./utils/boardUtils";

function App() {
  const [generation, setGeneration] = useState(0);
  const [[cols, rows], setColsRows] = useState([60, 40]);
  const [start, setStart] = useState(false);
  const [step, setStep] = useState(false);
  const [seed, setSeed] = useState(800);
  const [speed, setSpeed] = useState(940);
  const [draw, setDraw] = useState(false);
  // a possible way to improve performance is to use object intead of boolean for cell value
  const [board, setBoard] = useState(getInitRan(cols, rows, seed));
  const [theme, setTheme] = useState("vividRainbow");
  const [tooltip, setTooltip] = useState(false);

  const [messageBoard, setMessageBoard] = useState("");

  return (
    <div className="App">
      <Header generation={generation} messageBoard={messageBoard}/>
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
        step={step}
        setStep={setStep}
        draw={draw}
        setDraw={setDraw}
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
        step={step}
        setStep={setStep}
        draw={draw}
        setDraw={setDraw}
        tooltip={tooltip}
        setTooltip={setTooltip}
        messageBoard={messageBoard}
        setMessageBoard={setMessageBoard}
      />
    </div>
  );
}

export default App;
