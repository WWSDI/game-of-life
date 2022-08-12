import styles from "./info.module.css";

export default function Info({ generation, messageBoard }) {
  return (
    <div id={styles.info}>
      <h2 id={styles.messageBoard} style={{ color: "Green" }}>
        {messageBoard}
      </h2>
      <h2 style={{ fontSize: "medium" }}>
        <span>{generation ? `Generation: ${generation}` : null}</span>
      </h2>
    </div>
  );
}
