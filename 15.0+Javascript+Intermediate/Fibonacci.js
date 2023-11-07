/* Fibonacci was an Italian mathematician who came up with the Fibonacci sequence:

0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144 ...

Where every number is the sum of the two previous ones.

e.g. 0, 1, 1, 2, 3, 5 comes from
0 + 1 = 1
1 + 1 = 2
1 + 2 = 3
2 + 3 = 5
etc.

Create a function where you can call it by writing the code:
fibonacciGenerator (n)
Where n is the number of items in the sequence.
So I should be able to call:
fibonacciGenerator(3) and get 

[0,1,1] 

as the output. */

function fibonacci(n) {
    if(n <= 1) return 0;
    else if(n == 2) return 1;
    else return fibonacci(n-1)+fibonacci(n-2);
}
function fibonacciGenerator(n){
    var fibArr = [];
    for(var i=1; i<=n; ++i){
        fibArr.push(fibonacci(i));
    }
    return fibArr;
}
try{
    var input = prompt("Input max number for Fibonnaci ");
    if(input > 40) throw exception;
    var result = fibonacciGenerator(input);
    console.log(result);
} catch(err) { "Number you entered is too big and the "+ err.message; }
