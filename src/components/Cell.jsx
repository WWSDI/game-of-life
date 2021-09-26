import styles from "./styles.module.css";

export default function Cell({ handleClick, value, idx }) {
  // const [active, setActive] = useState(false);
  return (
    <div
      onClick={handleClick}
      className={`${styles.cell} ${value ? styles.cellOn : styles.cellOff}`}
      value={value}
      idx={idx}
    ></div>
  );
}
