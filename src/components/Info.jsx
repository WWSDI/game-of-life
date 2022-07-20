export default function Info({ generation, messageBoard }) {
  return (
    <div>
      <h2 style={{ fontSize: "medium" }}>
        <span>Generation:</span>
        <span>{generation}</span>
      </h2>
      <h2 id="messageBoard" style={{ color: "Green" }}>
        {messageBoard}
      </h2>
    </div>
  );
}
