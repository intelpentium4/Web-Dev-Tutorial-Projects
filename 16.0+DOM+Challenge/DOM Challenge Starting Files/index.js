function three(){
    var body = document.firstElementChild.lastElementChild.lastElementChild
    var ul = body.previousElementSibling // Currently pointing to script, goes 1 level previous to ul
    var li = ul.lastElementChild
    var access = li.innerHTML = "3";
}
three();

function green(){
    document.getElementsByTagName("li")[2].style.color = "green";
}
green();

function redirect(){
    document.querySelector("button").onclick = function(){
        var myLink = document.querySelector("li a")
        myLink.style.color = "orange";
        myLink.innerHTML = "<em>DuckDuckGo</em>";
        myLink.setAttribute("href", "https://www.DuckDuckGo.com");
        // also can use: myLink.href = "https://www.DuckDuckGo.com";
    }
}
redirect();

function toggleZoom(){
    document.querySelector("input[type=checkbox]").onclick = function(){
        document.querySelector("button").style.backgroundColor = "yellow";
        document.querySelector("body").classList.toggle("huge");
    }
}
toggleZoom();
