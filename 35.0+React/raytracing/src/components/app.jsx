import React, { useState } from "react";
import RayIntersectionApp from "./RayIntersectionApp";
import RayTracerCanvas from "./RayTracing2Dcanvas";
import Raster from "./Rasterization";

const date = new Date();
const currentTime = date.getHours();

let greeting;

const customStyle = {
  color: "",
};

if (currentTime < 12) {
  greeting = "Good Morning";
  customStyle.color = "red";
} else if (currentTime < 18) {
  greeting = "Good Afternoon";
  customStyle.color = "green";
} else {
  greeting = "Good Night";
  customStyle.color = "blue";
}

function App(){
  const [isRayTracerVisible, setRayTracerVisible] = useState(true);

  const toggleVisibility = () => {
    setRayTracerVisible((prev) => !prev);
  };

    return (
      <div>
        <h1 className="heading" style={customStyle}>
          {greeting}
        </h1>
        <RayIntersectionApp />
        <button onClick={toggleVisibility} style={{ margin: "20px" }}>
        Toggle RayTracer / Raster
        </button>

        {isRayTracerVisible ? (
        <RayTracerCanvas key="ray" />
      ) : (
        <Raster key="raster" />
)}
      </div>
    );
}

export default App;