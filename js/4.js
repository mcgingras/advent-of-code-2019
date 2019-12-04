let range = [138241,674034];

/**
 * rules
 * --------------
 * 6 digit number
 * within range above
 * two adj numbers are same
 * left to right, never decreases
 * 
 * 111111 is valid
 * 123456 not valid (no double)
 * 123441 not valid (decreases)
 * 
 * how many valid numbers are in this range
 */

 // this is straight up the dustiest code

 let min = range[0];
 let max = range[1];
 let count = 0;


 for(let i=min; i<=max; i++){
     let a = i.toString().split('');
     if(isValid(a)){
         count++;
     }
 }

 function isValid(a){
    let countAdj = 1;
    let countOfTwo = false;
    let increasing = true;
    let prev = a[0];
    
    for(let j=1; j<a.length; j++){
        
        if(a[j] < prev){
            increasing = false;
        }
        if(a[j] != prev && countAdj == 2){
            countOfTwo = true;
        }
        if(a[j] == prev){
            countAdj += 1;
        }
        else{
            countAdj = 1;
        }
        prev = a[j];
    }

    if(countAdj == 2){
        countOfTwo = true;
    }

    if(increasing && countOfTwo){
        return true;
    }

    return false;
 }


console.log(count);

console.log(isValid([2,2,2,3,3,4]));

