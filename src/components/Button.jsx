import styles from "./button.module.css";

export default function Button({ handleClick, children, disabled, style }) {
  return (
    <button
      // className={`${styles.button} ${true ? styles.buttonActivated : null}`}
      className={`${styles.button}`}
      onClick={handleClick}
      disabled={disabled}
     style={style} 
    >
      {children}
    </button>
  );
}
