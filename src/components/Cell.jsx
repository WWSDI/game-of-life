import {
  selectTheme,
} from "../utils/uiUtils";
import styles from "./cell.module.css";

const themes = {
  vividRainbow: {
    live: {
      red: [100, 200],
      green: [100, 200],
      blue: [100, 200],
    },
    dead: [0, 0, 0, 0.915],
  },
  dimRainbow: {
    live: {
      red: [50, 150],
      green: [50, 150],
      blue: [50, 150],
    },
    dead: [0, 0, 0, 0.715],
  },
  cherryblossom: {
    live: {
      red: [220, 30],
      green: [150, 50],
      blue: [200, 30],
    },
    dead: [245, 245, 245, 0.915],
  },
  flame: {
    live: {
      red: [100, 250],
      green: [10, 50],
      blue: [10, 50],
    },
    dead: [0, 0, 0, 0.915],
  },
  matrix: {
    live: {
      red: [10, 20],
      green: [120, 255],
      blue: [30, 50],
    },
    dead: [0, 0, 0, 1],
  },
  finland: {
    live: {
      red: [0, 10],
      green: [130, 100],
      blue: [180, 200],
    },
    dead: [255, 255, 255, 1],
  },
  sky: {
    live: {
      red: [220, 50],
      green: [220, 50],
      blue: [220, 50],
    },
    dead: "deepskyblue",
  },
  mono: {
    live: "green",
    dead: "black",
  },
};

export default function Cell({ handleClick, value, idx, handleMouseEnter, theme }) {
  return (
    <div
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      className={`${styles.cell}`}
      style={selectTheme(themes, theme, value)}
      value={value}
      idx={idx}
    ></div>
  );
}
