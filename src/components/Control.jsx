import Button from "./Button";
import {
  getEmptyBd,
  getInit,
  getInitRan,
  getMagneticRandomBd,
} from "../utils/boardUtils";
import styles from "./control.module.css";
import stylesBtn from "./button.module.css";

export default function Control({
  cols,
  rows,
  setColsRows,
  // setCols,
  // setRows,
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
  step,
  setStep,
  draw,
  setDraw,
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
      console.log("⭐️");
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
      return;
    }
    setTimeout(() => {
      document.querySelector(":root").style.setProperty("--cols", cols);
      setBoard(getInitRan(cols, rows, seed));
      setGeneration(1);
    }, 200);
  };

  const handleClear = () => {
    if (start) {
      setStart(false);
    }
    setTimeout(() => {
      setBoard(getEmptyBd(cols, rows));
      setGeneration(1);
    }, 200);
  };
  const toggleDraw = (e) => {
    e.currentTarget.classList.toggle(stylesBtn.buttonActivated);
    setDraw(!draw);
  };

  return (
    <div className={styles.controlContainer}>
      <div
        className={`${styles.changeColorTheme} ${styles.container} ${styles.tooltip}`}
      >
        <span class={styles.tooltiptext}>
          Change colour theme of the board
        </span>
        <select
          name="changeColorTheme"
          onChange={changeTheme}
        >
          <option selected disabled>
            Color Theme
          </option>
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

      <div className={`${styles.changeResolution} ${styles.container} ${styles.tooltip}`}>
        <span class={styles.tooltiptext}>
          Change resolution and shape of the board
        </span>
        <select
          name="changeResolution"
          disabled={start ? true : false}
          onChange={(e) => {
            if (!e.target.value) return;
            if (start) {
              setStart(false);
              return;
            }

            const [cols, rows] = e.target.value.match(/(\d{2})/g);
            setColsRows([+cols, +rows]);
          }}
        >
          <option selected disabled>
            Choose a resolution
          </option>
          <option value={[30, 30]}>Square (S, 30*30)</option>
          <option value={[40, 40]}>Square (M, 40*40)</option>
          <option value={[50, 50]}>Square (L, 50*50)</option>
          <option value={[50, 30]}>Widescreen (S, 50*30)</option>
          <option value={[60, 40]}>Widescreen (M, 60*40)</option>
          <option value={[80, 40]}>Widescreen (L, 80*40)</option>
        </select>
        <Button handleClick={changeRes} disabled={start ? true : false}>
          Change Resolution
        </Button>
      </div>

      <div className={`${styles.startStop} ${styles.container} ${styles.tooltip}`}>
        <span class={styles.tooltiptext}>
        Play/Pause the game. Use the slider to change the speed.
        </span>
        <Button handleClick={handleStartStop}>
          {start ? "STOP" : "START"}
        </Button>
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

      <div
        id="step"
        className={`${styles.step} ${styles.container} ${styles.tooltip}`}
        onClick={() => {
          console.log("<Control>: step button clicked", step);
          setStep(() => !step);
          // setStep(true);
        }}
      >
        <span class={styles.tooltiptext}>
        Manually step into the next generation.
        </span>
        <Button disabled={start ? true : false}>Step</Button>
      </div>

      <div
        id="seedRandomBoard"
        className={`${styles.seedRandomBoard} ${styles.container} ${styles.tooltip}`}
      >
        <span class={styles.tooltiptext}>
        Randomise the board. Use Seed slide to control the number of live cells being seeded.
        </span>
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

      <div id="draw" className={`${styles.draw} ${styles.container} ${styles.tooltip}`}>
        <div class={styles.tooltiptext}>
        Enable drawing mode. Can be used both when the game is running or paused.
        
        When on: hold <em>Alt</em> key to draw with widestroke, <em>Ctrl</em> for thinstroke; 
        </div>
        <Button handleClick={toggleDraw}>Draw</Button>
      </div>

      <div id="clearBoard" className={`${styles.clear} ${styles.container} ${styles.tooltip}`}>
        <span class={styles.tooltiptext}>
        Clear the whole board. Use if you want a blank canvas for Drawing.
        </span>
        <Button handleClick={handleClear}>Clear</Button>
      </div>
    </div>
  );
}
