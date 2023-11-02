/* Make an array counting numbers to a max amount.
    If the number is divisible by 3, input fizz.
    If the number is divisible by 5, input buzz.
    If the nuumber is divisible by both 3 and 5, input fizzbuzz.
    All other numbers, input the plain old number. */
var output = [];
function fizzbuzz(maxNum){
    for(let i=1; i<=maxNum; ++i){
        if(i%3 == 0){
            if(i%5 == 0)
                output.push("fizzbuzz");
            else output.push("fizz");
        } else output.push(i);
    }
}
fizzbuzz(prompt("input max number to go up to"));
console.log(output);