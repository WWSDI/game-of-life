import styles from "./button.module.css";

export default function Button({ handleClick, children, disabled }) {
  return (
    <button className={`${styles.button}`} onClick={handleClick} disabled={disabled}>
      <span>{children}</span>
    </button>
  );
}
