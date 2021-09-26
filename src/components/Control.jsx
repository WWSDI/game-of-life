import { useState } from "react";
import Button from "./Button";

export default function Control({
  cols,
  rows,
  setCols,
  setRows,
  seed,
  setSeed,
  start,
  setStart,
  clickRandom,
}) {
  const handleClick = () => {
    console.log("⭐️", start);
    setStart(!start);
    console.log("new⭐️", start);
  };

  return (
    <div>
      <label>Cols:</label>
      <input
        type="number"
        onChange={(e) => {
          setCols(e.target.value);
        }}
        value={cols}
      />
      <label>Rows:</label>
      <input
        type="number"
        onChange={(e) => {
          setRows(e.target.value);
        }}
        value={rows}
      />

      <Button handleClick={handleClick}>▶️ Start | ⏸ Pause</Button>
      <Button>⥅ Step</Button>
      <label>Seed Number</label>
      <input
        type="number"
        onChange={(e) => {
          setSeed(e.target.value);
        }}
        value={seed}
      />
      <Button handleClick={() => clickRandom(seed)}>Random</Button>
    </div>
  );
}
