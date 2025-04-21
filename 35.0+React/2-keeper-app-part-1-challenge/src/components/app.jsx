import React from "react";
import ReactDOM from "react-dom";

import { data } from "../note_data";
import Header from "./header";
import Note from "./note";
import Footer from "./footer";

// mapping data to component function
function createNote(data){
    return <Note
        key = {data.id}
        time = {data.title}
        desc = {data.note}
        link = {data.url}
    />;
}

function App(){
    return (
        <div>
            <Header />
            {data.map(createNote)}
        </div>
    );
}

export default App;