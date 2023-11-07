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
    document.querySelector("input[type=checkbox]").onclick = function(){
        var myLink = document.querySelector("li a")
        myLink.style.color = "orange";
        myLink.innerHTML = "DuckDuckGo";
        myLink.href = "https://www.DuckDuckGo.com";
    }
}
redirect();

function changeBackground(){
    document.querySelector("button").onclick = function(){
        document.querySelector("button").style.backgroundColor = "yellow";
    }
}
changeBackground();