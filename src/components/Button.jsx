import styles from "./button.module.css";

export default function Button({ handleClick, children }) {
  return (
    <div className={`${styles.button}`} onClick={handleClick}>
      {children}
    </div>
  );
}
