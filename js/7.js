const input = [3,8,1001,8,10,8,105,1,0,0,21,30,51,76,101,118,199,280,361,442,99999,3,9,102,5,9,9,4,9,99,3,9,102,4,9,9,1001,9,3,9,102,2,9,9,101,2,9,9,4,9,99,3,9,1002,9,3,9,1001,9,4,9,102,5,9,9,101,3,9,9,1002,9,3,9,4,9,99,3,9,101,5,9,9,102,4,9,9,1001,9,3,9,1002,9,2,9,101,4,9,9,4,9,99,3,9,1002,9,2,9,1001,9,3,9,102,5,9,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,99,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,99,3,9,1001,9,1,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,1,9,9,4,9,99,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,99,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,1,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,2,9,4,9,99];
const test = [3,23,3,24,1002,24,10,24,1002,23,-1,23,
    101,5,23,23,1,24,23,23,4,23,99,0,0];



class IntCodeComputer {
    constructor(program){
        this.program = program;
        this.input = "";
        this.output = [];
        this.pos = 0;
    }

    getNum(mode, num){
        return mode === 1 ? num : this.program[num];
    }

    runOp(op, mode){
        switch(op){
            case 1: // addition
                this.program[this.program[this.pos + 3]] = this.getNum(mode[0], this.program[this.pos+1]) + this.getNum(mode[1], this.program[this.pos+2]);
                this.pos += 4;
                break;

            case 2: // multiplication
                this.program[this.program[this.pos + 3]] = this.getNum(mode[0], this.program[this.pos+1]) * this.getNum(mode[1], this.program[this.pos+2]);
                this.pos += 4;
                break;
            

            // just have to adjust the input params to take an array,
            // pop the element out when it encounters this opcode, move to next one
            case 3: // input
                let input = this.input.pop();
                this.program[this.program[this.pos+1]] = input;
                this.pos += 2;
                break;

            case 4: // output
                let output = this.getNum(mode[0], this.program[this.pos+1]);
                this.output.push(output);
                this.pos += 2;
                return output;
                break;
            
            case 5: // jump if true (1st param non-zero)
                if(this.getNum(mode[0], this.program[this.pos +1]) != 0){
                    this.pos = this.getNum(mode[1], this.program[this.pos +2]);
                }
                else{
                    this.pos += 3;
                }
                break;
            
            case 6: // jump if false
                if(this.getNum(mode[0], this.program[this.pos +1]) == 0){
                    this.pos = this.getNum(mode[1], this.program[this.pos +2]);
                }
                else{
                    this.pos += 3;
                }
                break;
            
            case 7: // less than (1st param less than 2nd param store in 3rd param 1 else 0)
                if(this.getNum(mode[0], this.program[this.pos +1]) < this.getNum(mode[1], this.program[this.pos +2])){
                    this.program[this.program[this.pos + 3]] = 1;
                }
                else{
                    this.program[this.program[this.pos + 3]] = 0;
                }
                this.pos += 4;
                break;
            
            case 8: // equals
                if( this.getNum(mode[0], this.program[this.pos +1]) == this.getNum(mode[1], this.program[this.pos +2]) ){
                    this.program[this.program[this.pos + 3]] = 1;
                }
                else{
                    this.program[this.program[this.pos + 3]] = 0;
                }
                this.pos += 4;
                break;

            default: // catch
                break;
        }
    }

    readOp(code){
        return code
        .toString()
        .padStart(5, '0')
        .match(/(\d)(\d)(\d)(\d\d)/u)
        .slice(1)
        .map(Number)
        .reverse();
    }

    run(input){
        this.input = input;
        let halted = false;
        // console.log(this.program);

        while(!halted){
            if(this.program[this.pos] == 99){
                halted = true;
                break;
            }
            const [op, ...mode] = this.readOp(this.program[this.pos]);
            const output = this.runOp(op, mode);

            if(output){
                return this.output.pop();
            }   
        }
        return 'halted';
    }
}

const chainCommands = (program, seq) => {
    let input = 0;
    for(let i=0; i<seq.length; i++){
        let computer = new IntCodeComputer(program);
        input = computer.run([input, seq[i]]); 
    }
    return input;
}

var permutations = [5,6,7,8,9].reduce(function permute(res, item, key, arr) {
    return res.concat(arr.length > 1 && arr.slice(0, key).concat(arr.slice(key + 1)).reduce(permute, []).map(function(perm) { return [item].concat(perm); }) || item);
}, []);


// let max = 0;
// for(let i = 0; i<permutations.length; i++){
//     let res = chainCommands(input, permutations[i]);
//     max = Math.max(max, res);
// }

// part two
// 9 8 7 6 5
let t3 = [3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,
    27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5];

const loopCommands = (seq) => {
    let halted = false;
    let count = 0;
    let computers = [];
    let prevInput = 0;
    let input = 0;

    while(!halted){
        let i = count%5;
        
        if (computers[i] == undefined){
            /**
             * OKAY THIS IS STRANGE
             * I NEED TO UNDERSTAND THIS BUG
             * 
             * BEFORE I HAD IT AS NEW INTCODECOMPUTER(PROGRAM)
             * AND THE PROGRAM WAS GETTING MUTATED EACH TIME, EVEN THOUGH IT
             * SHOULD HAVE BEEN MODIFIED IN THE SCOPE OF THE CLASS ONLY?
             * 
             * IM SO CONFUSED BY THIS.
             */
            computers[i] = new IntCodeComputer([3,8,1001,8,10,8,105,1,0,0,21,30,51,76,101,118,199,280,361,442,99999,3,9,102,5,9,9,4,9,99,3,9,102,4,9,9,1001,9,3,9,102,2,9,9,101,2,9,9,4,9,99,3,9,1002,9,3,9,1001,9,4,9,102,5,9,9,101,3,9,9,1002,9,3,9,4,9,99,3,9,101,5,9,9,102,4,9,9,1001,9,3,9,1002,9,2,9,101,4,9,9,4,9,99,3,9,1002,9,2,9,1001,9,3,9,102,5,9,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,99,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,99,3,9,1001,9,1,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,1,9,9,4,9,99,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,99,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,1,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,2,9,4,9,99]);
            prevInput = input;
            input = computers[i].run([input,seq[i]])
        }
        else{
            let c = computers[i];
            prevInput = input;
            input = c.run([input]);
        }

        if(input == 'halted'){
            halted = 'true';
            return prevInput;
            break;
        }

        count++;
    }
}


let max = 0;
for(let i = 0; i<permutations.length; i++){
    let res = loopCommands(permutations[i]);
    max = Math.max(max, res);
}

console.log(max);











