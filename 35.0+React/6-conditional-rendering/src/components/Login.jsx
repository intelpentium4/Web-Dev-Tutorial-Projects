import React from "react";
import Input from "./Input";

const currentTime = new Date(2021, 1, 20, 18).getHours();

function Login(props){
    return (
    <div>
        {currentTime > 12 ? <h1>Why are you still working?</h1> : null}
        <form className="form">
        <Input type="text" placeholder="Username" />
        <Input type="password" placeholder="Password" />
        {props.Registered === false && (<Input type="password" placeholder="Confirm Password" />) /* This "and" logic acts like a condition */}
        <button type="submit">{props.Registered ? "Login" : "Register"}</button>
        </form>
    </div>
    );
}

export default Login;