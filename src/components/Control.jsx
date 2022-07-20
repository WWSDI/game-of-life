import Button from "./Button";
import {
  getEmptyBd,
  getInit,
  getInitRan,
  getMagneticRandomBd,
} from "../utils/boardUtils";
import styles from "./control.module.css";
import stylesBtn from "./button.module.css";
import { awaitTimeout } from "../utils/appUtil";
import {
  get2VerticalStripes,
  getCross,
  getHorizontalStripe,
  getSquare,
  getVerticalStripe,
  newShape,
} from "../utils/demoUtil";

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
  setTheme,
  step,
  setStep,
  setDraw,
  setTooltip,
  tooltip,
  messageBoard,
  setMessageBoard,
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

  const changeRes = (cols, rows, seed = 0) => {
    if (start) {
      setStart(false);
      return;
    }
    setTimeout(() => {
      console.log("🥵 inside changeRes: cols, rows", cols, rows)
      document.querySelector(":root").style.setProperty("--cols", cols);
      setBoard(getEmptyBd(cols, rows));
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
      setMessageBoard("");
    }, 400);
  };
  const toggleDraw = (e) => {
    e.currentTarget.classList.toggle(stylesBtn.buttonActivated);
    setDraw((draw) => !draw);
  };
  const toggleTooltip = (e) => {
    setTooltip((tooltip) => !tooltip);
    // due to useState is async and lagging, a temp state has to be created (it's a hack)
    const tooltipState = !tooltip;

    // toggle button activated state
    e.currentTarget.classList.toggle(stylesBtn.buttonActivated);

    // toggle animation state
    const allTooltiptext = document.querySelectorAll(
      `#control > div .${styles.tooltiptext}`
    );
    const state = tooltipState ? "running" : "paused";
    allTooltiptext.forEach((el) => {
      el.style.animationPlayState = state;
    });
  };

  const demo = () => {
    const setTheStage = (cols = 80, rows = 40) => {
      changeRes(cols, rows);
      setColsRows([cols, rows]);
      setSpeed(1000);
    };
    // let [cols, rows] = [80, 50];

    const dcBlingBling = async (cols = 80, rows = 40) => {
      setTheStage();

      setMessageBoard("Demo is about to start");
      await awaitTimeout(2000);
      const shape = getVerticalStripe(cols, rows, 3);
      console.log(shape);
      setMessageBoard("Ready?");
      setBoard(shape);

      await awaitTimeout(2000);
      setMessageBoard("Go!");
      setStart(true);

      await awaitTimeout(11000);
      setMessageBoard("I call this one DC bling bling! 😊");
      await awaitTimeout(9000);
      setMessageBoard("Demo is over, you can start another one.");
    };
    const doubleStrip = async (cols = 80, rows = 40) => {
      setTheStage();

      await awaitTimeout(2000);
      const shape = get2VerticalStripes(cols, rows, 3);
      console.log(shape);
      setBoard(shape);

      await awaitTimeout(2000);
      setStart(true);

      await awaitTimeout(30000);
      alert("demo is over, you can start another one");
    };
    const starryNight = async (cols = 80, rows = 40) => {
      setTheStage();

      await awaitTimeout(2000);
      const shape = getCross(cols, rows, 5);
      console.log(shape);
      setBoard(shape);

      await awaitTimeout(2000);
      setStart(true);

      await awaitTimeout(30000);
      alert("demo is over, you can start another one");
    };
    const snowFlake = async (cols=80, rows=50) => {
      setTheStage(cols, rows);

      await awaitTimeout(2000);
      const shape = getSquare(cols, rows, 16);
      console.log(shape);
      setBoard(shape);

      await awaitTimeout(2000);
      setStart(true);

      await awaitTimeout(30000);
      alert("demo is over, you can start another one");
    };

    // starryNight();
    // snowFlake()
    // doubleStrip();
    dcBlingBling();

  };

  return (
    <div id="control" className={styles.controlContainer}>
      <div
        className={`${styles.changeColorTheme} ${styles.container} ${styles.tooltip}`}
      >
        <span class={styles.tooltiptext}>Change colour theme of the board</span>
        <select name="changeColorTheme" onChange={changeTheme}>
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

      <div
        className={`${styles.changeResolution} ${styles.container} ${styles.tooltip}`}
      >
        <div class={styles.tooltiptext}>
          <p>Change resolution and shape of the board.</p>
        </div>
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
        <Button
          handleClick={() => changeRes(cols, rows)}
          disabled={start ? true : false}
        >
          Change Resolution
        </Button>
      </div>

      <div className={`${styles.demo} ${styles.container} ${styles.tooltip}`}>
        <div class={styles.tooltiptext}>
          <p>Watch automated demo.</p>
          <p>You can choose different demo to watch.</p>
          <p>Sit back and enjoy the mesmerising show!</p>
        </div>
        <Button handleClick={demo}>Demo</Button>
        <div className="flexContainer">
          <label>
            <select>
              <option value="">DC Bling Bling</option>
            </select>
          </label>
        </div>
      </div>

      <div
        className={`${styles.startStop} ${styles.container} ${styles.tooltip}`}
      >
        <div class={styles.tooltiptext}>
          <p>Play/Pause the game.</p>
          <p>Use the slider to change the speed.</p>
        </div>
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
        <div class={styles.tooltiptext}>
          <p>Manually step into the next generation.</p>
          <p>
            It's like playing a movie frame by frame. You can change the board
            with the drawing feature before stepping into the next generation.
          </p>
        </div>
        <Button disabled={start ? true : false}>Step</Button>
      </div>

      <div
        id="seedRandomBoard"
        className={`${styles.seedRandomBoard} ${styles.container} ${styles.tooltip}`}
      >
        <div class={styles.tooltiptext}>
          <p>Randomise the board.</p>
          <p>
            Use Seed slider to control the number of live cells being seeded
            into the board.
          </p>
        </div>
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

      <div
        id="draw"
        className={`${styles.draw} ${styles.container} ${styles.tooltip}`}
      >
        <div className={styles.tooltiptext}>
          <p>
            Toggle drawing mode. Can be used both when the game is running or
            paused.
          </p>
          <p>---------------------------</p>
          <p>When in drawing mode: </p>
          {((isMac) => {
            const keys = isMac
              ? ["⌃ Control", "⌘ Command", "⌥ Option"]
              : ["Ctrl", "Alt", "Win/Meta"];
            return (
              <ul style={{ textAlign: "left" }}>
                <li>
                  <p>
                    <strong>Draw</strong>: hold{" "}
                    <span style={{ fontWeight: "bold", color: "greenyellow" }}>
                      {keys[0]}
                    </span>{" "}
                    key to draw
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Erase</strong>: hold{" "}
                    <span style={{ fontWeight: "bold", color: "greenyellow" }}>
                      {keys[1]}
                    </span>{" "}
                    key
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Apply Thinstroke</strong>: hold ALSO{" "}
                    <span style={{ fontWeight: "bold", color: "greenyellow" }}>
                      {keys[2]}
                    </span>{" "}
                    key
                  </p>
                </li>
              </ul>
            );
          })(window.navigator.platform.includes("Mac"))}
        </div>
        <Button handleClick={toggleDraw}>Draw</Button>
      </div>

      <div
        id="clearBoard"
        className={`${styles.clear} ${styles.container} ${styles.tooltip}`}
      >
        <div className={styles.tooltiptext}>
          <p>Clear the whole board.</p>
          <p>Use when you want a blank canvas for Drawing.</p>
        </div>
        <Button handleClick={handleClear}>Clear</Button>
      </div>

      <div
        id="tooltip"
        className={`${styles.tooltip} ${styles.container} ${styles.tooltip}`}
        // onPointerOver={startTooltipAnimation}
      >
        <div className={styles.tooltiptext}>
          Enable tooltip. Hover on buttons to see tooltip.
        </div>
        <Button handleClick={toggleTooltip}>Tooltip</Button>
      </div>
    </div>
  );
}
