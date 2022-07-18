import Button from "./Button";
import { getInitRan } from "../utils/boardUtils";
import styles from "./control.module.css";

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
  theme,
  setTheme,
}) {
  const changeTheme = (event) => {
    setTheme(event.target.value);
  };

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
    <div className={styles.controlContainer}>
      <div className={`${styles.changeColorTheme} ${styles.container}`}>
        <select value={theme} onChange={changeTheme}>
          <option value="vividRainbow">Change Color Theme</option>
          <option value="dimRainbow">Dim Rainbow</option>
          <option value="vividRainbow">Vivid Rainbow</option>
          <option value="matrix">Matrix</option>
          <option value="mono">Mono Green</option>
          <option value="finland">Finland</option>
          <option value="sky">Sky</option>
          <option value="flame">Flame</option>
          <option value="cherryblossom">Cherry Blossom</option>
        </select>
      </div>

      <div
        className={`${styles.changeResolution} ${styles.container}`}
      >
        <label>
          Cols:
          <input
            type="number"
            onChange={(e) => {
              setCols(() => Number(e.target.value));
              console.log("COLS", cols);
            }}
            value={cols}
          />
        </label>
        {/* <h2>{cols}</h2> */}
        <label>
          Rows:
          <input
            type="number"
            onChange={(e) => {
              setRows(Number(e.target.value));
              console.log("ROWS", e.target.value, rows);
            }}
            value={rows}
          />
        </label>
        {/* <h2>{rows}</h2> */}
        <Button handleClick={changeRes}>Change Resolution</Button>
      </div>

      <div className={`${styles.startStop} ${styles.container}`}>
        <Button handleClick={handleStartStop}>⏯</Button>
        <div className="flexContainer ">
          <label>
            <input
              type="range"
              value={speed}
              min={0}
              max={1000}
              step={10}
              onChange={(e) => {
                setSpeed(Number(e.target.value));
              }}
            />
          </label>
          {/* use parabola function to turn speed slider from linear to parabola that is more inline with actual speed changes */}
          <span>
            {speed < 200
              ? (speed ** 2 / 10000 + 1).toFixed(1)
              : Math.round(speed ** 2 / 10000)}
          </span>
        </div>
      </div>

      <div id="step" className={`${styles.step} ${styles.container}`}>
        <Button>Step to Next Generation</Button>
      </div>

      <div
        id="seedRandomBoard"
        className={`${styles.seedRandomBoard} ${styles.container}`}
      >
        <label>
          Seed Number
          <input
            type="number"
            onChange={(e) => {
              setSeed(e.target.value);
            }}
            value={seed}
          />
        </label>
        <Button handleClick={() => clickRandom(seed)}>Random</Button>
      </div>

      <div id="draw" className={`${styles.draw} ${styles.container}`}>
        <Button>Draw (hold ctl key ^)</Button>
      </div>
    </div>
  );
}
