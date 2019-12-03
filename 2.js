input = [
    1,12,2,3,1,1,2,3,1,3,4,3,1,5,0,3,2,1,9,19,1,13,19,23,2,23,9,27,1,6,27,31,2,10,31,35,1,6,35,39,2,9,39,43,1,5,43,47,2,47,13,51,2,51,10,55,1,55,5,59,1,59,9,63,1,63,9,67,2,6,67,71,1,5,71,75,1,75,6,79,1,6,79,83,1,83,9,87,2,87,10,91,2,91,10,95,1,95,5,99,1,99,13,103,2,103,9,107,1,6,107,111,1,111,5,115,1,115,2,119,1,5,119,0,99,2,0,14,0
]

// small test cases for easier testing 
t1 = [1,0,0,0,99]; // 2,0,0,0,99
t2 = [1,1,1,4,99,5,6,0,99] // 30,1,1,4,2,5,6,0,99


function run(input){
    let notHalted = true;
    let op = 0;

    while(notHalted){
        let e = input[op];
        let p1 = input[op+1];
        let p2 = input[op+2];
        let pos  = input[op+3];
        
        if(e == 1){ // add
            input[pos] = input[p1] + input[p2];
        }
    
        if(e == 2){ // mul
            input[pos] = input[p1] * input[p2];
        }
    
        op = op + 4;
        if(input[op] == 99){
            notHalted = false;
        }
    }

    return input[0];
}

// const solPartOne = run(input);


// part 2

for(let x=0; x<100; x++){
    for(let y=0; y<100; y++){
        let temp = input.slice(0);
        temp[1] = x;
        temp[2] = y;
        const val = run(temp);
        if(val == 19690720){
            console.log(x,y);
        }
    }
}