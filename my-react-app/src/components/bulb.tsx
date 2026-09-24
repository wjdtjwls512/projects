import { useState } from "react";
import './bulb.css'

const Bulb = () => {
  const [light, setLight] = useState("OFF");

  const change = () => {
    setLight(light === "OFF" ? "ON" : "OFF");
  };

  return (
    <>
      <div id="bulb"style={{ backgroundColor: light === "ON" ? "orange" : "gray" }}>
      </div>
      <button onClick={change} className="bg-gray-300">
        {light === "ON" ? <h1>끄기</h1> : <h1>켜기</h1>}
      </button>
    </>
  );
};

export default Bulb;
