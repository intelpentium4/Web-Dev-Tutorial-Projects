import React from "react";
import RayIntersectionApp from "./RayIntersectionApp";

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
    return (
      <div>
        <h1 className="heading" style={customStyle}>
          {greeting}
        </h1>
        <RayIntersectionApp />
      </div>
    );
}

export default App;