/**
 * Welcome to the Stanford Karel IDE.
 * This is a free space for you to 
 * write any Karel program you want.
 * link: https://stanford.edu/~cpiech/karel/ide.html
 **/
function main(){
    //your code here
    while(frontIsClear()){
       goNorthEast();
    }
 }
 function goInHalfCircle(){
    move();
    turnLeft();
    move();
    turnLeft();
 }
 function goInCircle(){
    goInHalfCircle();
    goInHalfCircle();
 }
 function goNorthEast(){
    move();
    turnLeft();
    if(frontIsClear()){
       move();
       turnRight();
    }
 }