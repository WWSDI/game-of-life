import Info from "./Info";
import styles from "./header.module.css"

export default function Header({generation, messageBoard}) {
  return (
    <header>
      <h1>
        <span style={{ fontSize: "medium", color: "" }}>
          Shawn's Implementation of
        </span>{" "}
        <span>
          <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">
            Game of Life
          </a>
        </span>
      </h1>
      <Info generation={generation} messageBoard={messageBoard} />
    </header>
  );
}
