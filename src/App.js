import { useState } from "react";
import "./App.css";
import Board from "./components/Board";
import Control from "./components/Control";

function App() {
  const [cols, setCols] = useState(40);
  const [rows, setRows] = useState(30);
  const [start, setStart] = useState(false)

  return (
    <div className="App">
      {/* <Setting /> */}
      <Board cols={cols} rows={rows} start={start}setStart={setStart} />
      <Control start={start} setStart={setStart} />
    </div>
  );
}

export default App;
