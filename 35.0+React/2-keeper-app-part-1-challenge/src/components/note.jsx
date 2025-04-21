import React from "react";

function Note(props){
    return (
        <div className="note">
            <h1>{props.time}</h1>
            <p>{props.desc}</p>
            <img className="img-compact" alt="picture of diapers" src={props.link} />
        </div>
    );
}

export default Note;