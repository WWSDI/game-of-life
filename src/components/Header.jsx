import Info from "./Info";
import styles from "./header.module.css";

export default function Header({ generation, messageBoard }) {
  return (
    <header>
      <h1 id={styles["title"]}>
        <span className={styles.gradientText}>GAME</span>{" "}
        <span className={styles.gradientText}>OF</span>{" "}
        <span className={styles.gradientText}>LIFE</span>
        {/* <span id="logo">
        <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">
        GAME OF LIFE
        </a>
        </span>{" "} */}
      </h1>
      {generation || messageBoard ? (
        <Info generation={generation} messageBoard={messageBoard} />
      ) : null}
    </header>
  );
}
