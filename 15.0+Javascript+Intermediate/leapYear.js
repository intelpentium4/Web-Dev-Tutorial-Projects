/* 💪This is a Difficult Challenge 💪

Write a program that works out whether if a given year is a leap year. A normal year has 365 days, leap years have 366, with an extra day in February. The reason why we have leap years is really fascinating, this video goes into more detail.

This is how to work out whether if a particular year is a leap year:

A year is a leap year if it is evenly divisible by 4 ;

except if that year is also evenly divisible by 100;

unless that year is also evenly divisible by 400.



e.g. Is the year 2000 a leap year?:

2000 ÷ 4 = 500 (Leap)

2000 ÷ 100 = 20 (Not Leap)

2000 ÷ 400 = 5 (Leap!) */
function isLeapYear(year){
    if(year%4 == 0){
        if(year%100 == 0){
            if(year%400 == 0)
                return true;
            else return false;
        }
        else return true;
    }
    else return false;
}