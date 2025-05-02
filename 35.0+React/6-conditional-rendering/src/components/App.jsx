import React from "react";
import Login from "./Login";

var isLoggedIn = false;
var isRegistered = false;

function App() {
  return (
    <div className="container">
      {isLoggedIn ? <h1>Hello User!</h1> : <Login Registered={isRegistered}/> /* ternary or conditional operator */}
    </div>
  );
}

export default App;
