import { useState } from "react";
import "./counter.css";

const Counter = () => {
  const [num, setNum] = useState(0);

  const add = () => {
    setNum(num + 1);
  };

  const sub = () => {
    setNum(num - 1);
  };

  return (
    <div id="main">
      <div id="num" className="text-xl">{num}</div>
      <button onClick={add} className="bg-red-500 text-white">
        +
      </button>
      <button onClick={sub} className="bg-red-500 text-white">
        -
      </button>
    </div>
  );
};

export default Counter;
