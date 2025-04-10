import React from "react";

var cpr = new Date().getFullYear();

function Footer(){
    return (
        <footer>
                <p>Copyright ⓒ {cpr}</p>
        </footer>
    );
}

export default Footer;