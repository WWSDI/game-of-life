import Button from "./Button";
import { getInit, getInitRan } from "../utils/boardUtils";

export default function Control({
  cols,
  rows,
  setCols,
  setRows,
  seed,
  setSeed,
  speed,
  setSpeed,
  start,
  setStart,
  setBoard,
  generation,
  setGeneration,
}) {
  const handleStartStop = () => {
    console.log("⭐️ start/stop clicked: current gen:", generation);
    setStart(!start);
  };

  const clickRandom = (seed) => {
    console.log("⭐️ about to use RANDOM BOARD");
    if (!start) {
      setBoard(getInitRan(cols, rows, seed));
      setGeneration(1);
      return;
    }

    setStart(false);
    // very inelegant way to make it sync
    setTimeout(() => {
      setBoard(getInitRan(cols, rows, seed));
      setGeneration(1);
    }, 200);
  };

  const changeRes = () => {
    if (start) {
      setStart(false);
    }
    setTimeout(() => {
      document.querySelector(":root").style.setProperty("--cols", cols);
      setBoard(getInitRan(cols, rows, seed));
      setGeneration(1);
    }, 200);
  };

  return (
    <div>
      <div className="container">
        <label>Cols:</label>
        <input
          type="number"
          onChange={(e) => {
            setCols(() => Number(e.target.value));
            console.log("COLS", cols);
          }}
          value={cols}
        />
        {/* <h2>{cols}</h2> */}
        <label>Rows:</label>
        <input
          type="number"
          onChange={(e) => {
            setRows(Number(e.target.value));
            console.log("ROWS", e.target.value, rows);
          }}
          value={rows}
        />
        {/* <h2>{rows}</h2> */}
        <Button handleClick={changeRes}>Change Resolution</Button>
      </div>

      <div className="container">
        <Button handleClick={handleStartStop}>⏯</Button>
        <input
          type="range"
          value={speed}
          min={0}
          max={1000}
          step={20}
          onChange={(e) => {
            setSpeed(Number(e.target.value));
          }}
        />
        <span>{speed}</span>
        <Button>⥅ Step</Button>
      </div>

      <div className="container">
        <label>Seed Number</label>
        <input
          type="number"
          onChange={(e) => {
            setSeed(e.target.value);
          }}
          value={seed}
        />
        <Button handleClick={() => clickRandom(seed)}>Random</Button>
      </div>

      <div id="draw" className="container">
        <Button>Draw (hold ctl key ^)</Button>
      </div>
    </div>
  );
}
