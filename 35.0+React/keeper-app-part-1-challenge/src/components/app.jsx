import React from "react";
import ReactDOM from "react-dom";

import Header from "./header";
import Note from "./note";
import Footer from "./footer";

function App(){
    return (
        <html>
            <Header />
            <Note />
            <Footer />
        </html>
    );
}

export default App;