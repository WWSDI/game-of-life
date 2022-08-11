import Info from "./Info";
import styles from "./header.module.css";

export default function Header({ generation, messageBoard }) {
  return (
    <header>
      <h1 id={styles["title"]}>
        <span id="logo" style={{ fontSize: "xx-large", color: "" }}>
          <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">
            GAME OF LIFE
          </a>
        </span>{" "}
      </h1>
      {generation || messageBoard ? (
        <Info generation={generation} messageBoard={messageBoard} />
      ) : null}
    </header>
  );
}
