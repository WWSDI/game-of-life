import styles from "./cell.module.css";

export default function Cell({ handleClick, value, idx, handleMouseEnter }) {
  return (
    <div
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      className={`${styles.cell} ${value ? styles.cellOn : styles.cellOff}`}
      value={value}
      idx={idx}
    ></div>
  );
}
