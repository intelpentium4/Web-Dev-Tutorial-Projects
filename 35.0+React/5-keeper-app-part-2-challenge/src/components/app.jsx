import React from "react";
import ReactDOM from "react-dom";

import data from "../note_data";
import Header from "./header";
import Note from "./note";
import Footer from "./footer";

function App(){
    return (
        <div>
            <Header />
            {data.map(item => // fat arrow function based on anonymous functions to return one <Note w_props> looping over each data in note_data to make multiple "cards"
            <Note
                key = {item.id}
                time = {item.title}
                desc = {item.note}
                link = {item.url}
            />
            )}
        </div>
    );
}

export default App;