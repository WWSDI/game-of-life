import { useState } from "react";
import { getRow } from "./Board";
import Button from "./Button";

export default function Control({
  cols,
  rows,
  setCols,
  setRows,
  seed,
  setSeed,
  speed,
  setSpeed,
  start,
  setStart,
  clickRandom,
  changeRes
  ,draw,setDraw
}) {
  const handleClick = () => {
    console.log("⭐️", start);
    setStart(!start);
    console.log("new⭐️", start);
  };
  const toggleDraw = () =>{
    console.log('✏️',draw)
    setDraw(!draw)
  }

  return (
    <div>
      <div className="container">
        <label>Cols:</label>
        <input
          type="number"
          onChange={(e) => {
            setCols(() => Number(e.target.value));
            console.log("COLS", cols);
          }}
          value={cols}
        />
        {/* <h2>{cols}</h2> */}
        <label>Rows:</label>
        <input
          type="number"
          onChange={(e) => {
            setRows(Number(e.target.value));
            console.log("ROWS", e.target.value, rows);
          }}
          value={rows}
        />
        {/* <h2>{rows}</h2> */}
        <Button handleClick={changeRes}>Change Resolution</Button>
      </div>

      <div className="container">
        <Button handleClick={handleClick}>▶️ Start | ⏸ Pause</Button>
        <input
          type="range"
          value={speed}
          min={0}
          max={1000}
          step={20}
          onChange={(e) => {
            setSpeed(e.target.value);
          }}
        />
        <span>{speed}</span>
        <Button>⥅ Step</Button>
      </div>

      <div className="container">
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
    
      <div id="draw" className="container">
        <Button >Draw (hold ctl key ^)</Button>
      </div>
    </div>
  );
}
