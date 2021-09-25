import Button from "./Button";

export default function Control({ start, setStart }) {
  const handleClick = () => {
    console.log("⭐️", start);
    setStart(!start);
    console.log("new⭐️", start);
  };

  return (
    <div>
      <Button >▶️ Start | ⏸ Pause</Button>
      <Button handleClick={handleClick}>⥅ Step</Button>
      {/* <Button >Start</Button>
    <Button >Start</Button> */}
    </div>
  );
}
