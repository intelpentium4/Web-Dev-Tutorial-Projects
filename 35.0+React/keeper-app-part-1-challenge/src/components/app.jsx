import React from "react";
import ReactDOM from "react-dom";

import { links } from "../links";
import Header from "./header";
import Note from "./note";
import Footer from "./footer";

function App(){
    return (
        <div>
            <Header />
            <Note time="Timmy @9am" desc="pale yellow urine" link={links[0]}/>
            <Note time="Michael @1pm" desc="diarrhea and skin irritation" link={links[1]}/>
            <Note time="Sasha @8pm" desc="solid with some blood" link={links[2]}/>
            <Footer />
        </div>
    );
}

export default App;