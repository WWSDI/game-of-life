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
  getSquare,
  getVerticalStripe,
} from "../utils/demoUtil";
import { useEffect, useRef, useState } from "react";

export default function Control({
  cols,
  rows,
  setColsRows,
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
  draw,
  setDraw,
  setTooltip,
  tooltip,
  setMessageBoard,
}) {
  const [demo, setDemo] = useState("title");
  const startRef = useRef(start);

  const changeTheme = (event) => {
    setTheme(event.target.value);
  };

  const handleStartStop = () => {
    console.log("⭐️ start/stop clicked: current gen:", generation);
    setStart(!start);
    startRef.current = !start;
  };

  const clickRandom = (seed) => {
    console.log("⭐️ about to use RANDOM BOARD");
    if (!start) {
      console.log("⭐️");
      setBoard(getInitRan(cols, rows, seed));
      setGeneration(0);
      return;
    }

    setStart(false);
    // very inelegant way to make it sync
    setTimeout(() => {
      setBoard(getInitRan(cols, rows, seed));
      setGeneration(0);
    }, 200);
  };

  const changeRes = (cols, rows, seed = 0) => {
    if (start) {
      setStart(false);
      return;
    }
    setTimeout(() => {
      console.log("🥵 inside changeRes: cols, rows", cols, rows);
      document.querySelector(":root").style.setProperty("--cols", cols);
      setBoard(getEmptyBd(cols, rows));
      setGeneration(0);
    }, 200);
  };

  const handleClear = () => {
    if (start) {
      setStart(false);
    }
    setTimeout(() => {
      setBoard(getEmptyBd(cols, rows));
      setGeneration(0);
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

  const handleDemo = () => {
    const setTheStage = (cols = 80, rows = 40) => {
      changeRes(cols, rows);
      setColsRows([cols, rows]);
      setSpeed(900);
      setGeneration(0);
      setMessageBoard("Demo is about to start");
    };
    const cleanup = async (waitTime) => {
      await awaitTimeout(waitTime);
      if (startRef.current)
        setMessageBoard("Demo is over, thank you for watching.");

      await awaitTimeout(3000);
      setMessageBoard("");
    };

    const title = async () => {
      setMessageBoard(
        <div className={styles.warning}>
          <p>⚠️ Please first choose a demo from the dropdown list to play.</p>
        </div>
      );
      await awaitTimeout(5000);
      setMessageBoard("");
    };

    const dcBlingBling = async (cols = 80, rows = 40) => {
      setTheStage();

      await awaitTimeout(2000);
      const shape = getVerticalStripe(cols, rows, 3);

      setMessageBoard("Ready?");
      setBoard(shape);

      await awaitTimeout(2000);
      setMessageBoard("Go!");
      setStart(true);
      startRef.current = true;

      await awaitTimeout(11000);
      if (startRef.current) setMessageBoard("Bling bling! 😊");

      cleanup(9000);
    };
    const doubleStripe = async (cols = 80, rows = 40) => {
      setTheStage();

      await awaitTimeout(2000);
      const shape = get2VerticalStripes(cols, rows, 3);
      console.log(shape);
      setBoard(shape);

      setMessageBoard("Go!");
      await awaitTimeout(2000);
      setStart(true);
      startRef.current = true;

      await awaitTimeout(15000);
      if (startRef.current) setMessageBoard("Still going...");

      cleanup(15000);
    };
    const starryNight = async (cols = 80, rows = 40) => {
      setTheStage();

      await awaitTimeout(2000);
      const shape = getCross(cols, rows, 5);
      console.log(shape);
      setBoard(shape);

      await awaitTimeout(2000);
      setMessageBoard("Go!");
      setStart(true);
      startRef.current = true;

      await awaitTimeout(15000);
      if (startRef.current) setMessageBoard("Still going...");

      cleanup(15000);
    };
    const snowFlake = async (cols = 80, rows = 50) => {
      setTheStage(cols, rows);

      await awaitTimeout(2000);
      setMessageBoard("Hmmn, this is gonna be a short one...");
      const shape = getSquare(cols, rows, 16);
      console.log(shape);
      setBoard(shape);

      await awaitTimeout(2000);
      setStart(true);
      startRef.current = true;

      await awaitTimeout(5000);
      if (startRef.current)
        setMessageBoard(
          "This reminds me a little bit of Frozen. What do you think?"
        );

      cleanup(5000);
    };

    const demos = {
      title,
      dcBlingBling,
      snowFlake,
      doubleStripe,
      starryNight,
    };

    demos[demo]();
  };

  return (
    <div id="control" className={styles.controlContainer}>
      <div
        className={`${styles.changeColorTheme} ${styles.container} ${styles.tooltip}`}
      >
        <div>
          <span className={styles.tooltiptext}>
            Change colour theme of the board. You can change colour while the
            game is playing.
          </span>
          <select
            name="changeColorTheme"
            onChange={changeTheme}
            defaultValue="title"
          >
            <option value="title" disabled>
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
      </div>

      <div
        className={`${styles.changeResolution} ${styles.container} ${styles.tooltip}`}
      >
        <div>
          <div className={styles.tooltiptext}>
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
            defaultValue="title"
          >
            <option value="title" disabled>
              Choose size to
            </option>
            <option value={[30, 30]}>Square (30*30)</option>
            <option value={[40, 40]}>Square (40*40)</option>
            <option value={[50, 50]}>Square (50*50)</option>
            <option value={[50, 30]}>Wide (50*30)</option>
            <option value={[60, 40]}>Wide (60*40)</option>
            <option value={[80, 40]}>Wide (80*40)</option>
          </select>
          <Button
            handleClick={() => changeRes(cols, rows)}
            disabled={start ? true : false}
            style={{ width: "6rem" }}
          >
            Apply
          </Button>
        </div>
      </div>

      <div className={`${styles.demo} ${styles.container} ${styles.tooltip}`}>
        <div>
          <div className={styles.tooltiptext}>
            <p>Watch automated demo.</p>
            <p>You can choose different demo to watch.</p>
            <p>Sit back and enjoy the mesmerising show!</p>
          </div>
          <div className="flexContainer">
            <select
              value={demo}
              onChange={(e) => setDemo(e.target.value)}
              disabled={start ? true : false}
            >
              <option value="title" disabled>
                Choose a demo to
              </option>
              <option value="dcBlingBling">DC Bling Bling</option>
              <option value="starryNight">Starry Night</option>
              <option value="snowFlake">Snow Flake</option>
              <option value="doubleStripe">Double Stripe</option>
            </select>
          </div>
          <Button
            handleClick={() => handleDemo(demo)}
            disabled={start ? true : false}
            style={{ width: "5rem" }}
          >
            Play
          </Button>
        </div>
      </div>

      <div
        className={`${styles.startStop} ${styles.container} ${styles.tooltip}`}
      >
        <div className={styles.tooltiptext}>
          <p>Play/Pause the game.</p>
          <p>Use the slider to change the speed.</p>
        </div>
        <Button handleClick={handleStartStop}>
          {/* {start ? "STOP" : "START"} */}
          {start ? (
            <div
              style={{
                fontVariationSettings:
                  "'FILL' 0, 'wght' 100, 'GRAD' 0, 'opsz' 48;",
              }}
            >
              <span class="material-symbols-outlined">pause</span>
            </div>
          ) : (
            <div
              style={{
                fontVariationSettings:
                  "'FILL' 0, 'wght' 100, 'GRAD' 0, 'opsz' 48;",
              }}
            >
              <span class="material-symbols-outlined">play_arrow</span>
            </div>
          )}
        </Button>
      </div>

      <div className={`${styles.flexContainer} ${styles.speed}`}>
        <div>
          {/* use parabola function to turn speed slider from linear to parabola that is more inline with actual speed changes */}
          <span>
            Speed{": "}
            {speed < 200
              ? (speed ** 2 / 10000 + 1).toFixed(1)
              : Math.round(speed ** 2 / 10000)}
          </span>
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
        </div>
      </div>

      <div
        id="step"
        className={`${styles.step} ${styles.container} ${styles.tooltip}`}
        onClick={() => {
          console.log("<Control>: step button clickesd", step);
          setStep(() => !step);
          // setStep(true);
        }}
      >
        <div className={styles.tooltiptext}>
          <p>Manually step into the next generation.</p>
          <p>
            It's like playing a movie frame by frame. You can change the board
            with the drawing feature before stepping into the next generation.
          </p>
        </div>
        <Button disabled={start ? true : false}>
          <div
            style={{
              fontVariationSettings:
                "'FILL' 0, 'wght' 100, 'GRAD' 0, 'opsz' 48;",
            }}
          >
            <span class="material-symbols-outlined">skip_next</span>
          </div>
        </Button>
      </div>

      <div
        id="seedRandomBoard"
        className={`${styles.seedRandomBoard} ${styles.container} ${styles.tooltip}`}
      >
        <div className={styles.tooltiptext}>
          <p>Randomise the board.</p>
          <p>
            Use Seed slider to control the number of live cells being seeded
            into the board.
          </p>
        </div>

        <Button handleClick={() => clickRandom(seed)}>Random</Button>
      </div>

      <div
        className={`${styles.seed} ${styles.flexContainer} ${styles.tooltip}`}
      >
        <div className={styles.tooltiptext}>
          <p>Choose seed number</p>
          <p>
            Seed number determines how many cells are 'live' when you click
            'Random' button to randomly initialise the board.
          </p>
        </div>
        <span>Seed: {seed}</span>
        <input
          type="range"
          value={seed}
          min={0}
          max={2000}
          step={10}
          onChange={(e) => {
            setSeed(e.target.value);
          }}
        />
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
                    <strong>Apply Thinstroke</strong>: hold either one of the
                    above key while ALSO{" "}
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
        <Button handleClick={toggleDraw}>
          {draw ? (
            <div
              style={{
                fontVariationSettings:
                  "'FILL' 0, 'wght' 100, 'GRAD' 0, 'opsz' 48;",
              }}
            >
              <span class="material-symbols-outlined">draw</span>
            </div>
          ) : (
            <div
              style={{
                fontVariationSettings:
                  "'FILL' 0, 'wght' 100, 'GRAD' 0, 'opsz' 48;",
              }}
            >
              <span class="material-symbols-outlined">edit</span>
            </div>
          )}
        </Button>
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
        className={`${styles.tip} ${styles.container} ${styles.tooltip}`}
        // onPointerOver={startTooltipAnimation}
      >
        <div className={styles.tooltiptext}>
          <p>Enable tooltip. Hover on buttons to see tooltip.</p>
          <p>------------------------------------------</p>
          <p>Game of Life Intro:</p>
          <p style={{ textAlign: "left" }}>
            Each dot on the grid/board is a cell. A black cell is a dead cell; a
            coloured cell is a live cell. At each step in time, the following
            transitions occur:
          </p>
          <ul style={{ textAlign: "left" }}>
            <li>
              Any live cell with fewer than 2 live neighbours dies, as if by{" "}
              <strong>underpopulation</strong>.
            </li>
            <br></br>
            <li>
              Any live cell with 2 or 3 live neighbours{" "}
              <strong>lives on</strong> to the next generation.
            </li>
            <br></br>
            <li>
              Any live cell with more than 3 live neighbours dies, as if by{" "}
              <strong>overpopulation</strong>.
            </li>
            <br></br>
            <li>
              Any dead cell with exactly 3 live neighbours becomes a live cell,
              as if by <strong>reproduction</strong>.
            </li>
          </ul>
        </div>
        <Button handleClick={toggleTooltip}>
          <div
            style={{
              fontVariationSettings:
                "'FILL' 0, 'wght' 100, 'GRAD' 0, 'opsz' 48;",
            }}
          >
            <span class="material-symbols-outlined">question_mark</span>
          </div>
        </Button>
      </div>
    </div>
  );
}
