import styles from "./button.module.css";

export default function Button({ handleClick, children, disabled }) {
  return (
    <button
      // className={`${styles.button} ${true ? styles.buttonActivated : null}`}
      className={`${styles.button}`}
      onClick={handleClick}
      disabled={disabled}
      
    >
      <span>{children}</span>
    </button>
  );
}
