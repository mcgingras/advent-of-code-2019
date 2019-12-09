let real = [3,225,1,225,6,6,1100,1,238,225,104,0,1002,188,27,224,1001,224,-2241,224,4,224,102,8,223,223,1001,224,6,224,1,223,224,223,101,65,153,224,101,-108,224,224,4,224,1002,223,8,223,1001,224,1,224,1,224,223,223,1,158,191,224,101,-113,224,224,4,224,102,8,223,223,1001,224,7,224,1,223,224,223,1001,195,14,224,1001,224,-81,224,4,224,1002,223,8,223,101,3,224,224,1,224,223,223,1102,47,76,225,1102,35,69,224,101,-2415,224,224,4,224,102,8,223,223,101,2,224,224,1,224,223,223,1101,32,38,224,101,-70,224,224,4,224,102,8,223,223,101,3,224,224,1,224,223,223,1102,66,13,225,1102,43,84,225,1101,12,62,225,1102,30,35,225,2,149,101,224,101,-3102,224,224,4,224,102,8,223,223,101,4,224,224,1,223,224,223,1101,76,83,225,1102,51,51,225,1102,67,75,225,102,42,162,224,101,-1470,224,224,4,224,102,8,223,223,101,1,224,224,1,223,224,223,4,223,99,0,0,0,677,0,0,0,0,0,0,0,0,0,0,0,1105,0,99999,1105,227,247,1105,1,99999,1005,227,99999,1005,0,256,1105,1,99999,1106,227,99999,1106,0,265,1105,1,99999,1006,0,99999,1006,227,274,1105,1,99999,1105,1,280,1105,1,99999,1,225,225,225,1101,294,0,0,105,1,0,1105,1,99999,1106,0,300,1105,1,99999,1,225,225,225,1101,314,0,0,106,0,0,1105,1,99999,1108,226,677,224,1002,223,2,223,1005,224,329,101,1,223,223,108,226,226,224,1002,223,2,223,1005,224,344,1001,223,1,223,1107,677,226,224,1002,223,2,223,1006,224,359,101,1,223,223,1008,226,226,224,1002,223,2,223,1005,224,374,101,1,223,223,8,226,677,224,102,2,223,223,1006,224,389,101,1,223,223,7,226,677,224,1002,223,2,223,1005,224,404,1001,223,1,223,7,226,226,224,1002,223,2,223,1005,224,419,101,1,223,223,107,226,677,224,1002,223,2,223,1005,224,434,101,1,223,223,107,226,226,224,1002,223,2,223,1005,224,449,1001,223,1,223,1107,226,677,224,102,2,223,223,1006,224,464,1001,223,1,223,1007,677,226,224,1002,223,2,223,1006,224,479,1001,223,1,223,1107,677,677,224,1002,223,2,223,1005,224,494,101,1,223,223,1108,677,226,224,102,2,223,223,1006,224,509,101,1,223,223,7,677,226,224,1002,223,2,223,1005,224,524,1001,223,1,223,1008,677,226,224,102,2,223,223,1005,224,539,1001,223,1,223,1108,226,226,224,102,2,223,223,1005,224,554,101,1,223,223,107,677,677,224,102,2,223,223,1006,224,569,1001,223,1,223,1007,226,226,224,102,2,223,223,1006,224,584,101,1,223,223,8,677,677,224,102,2,223,223,1005,224,599,1001,223,1,223,108,677,677,224,1002,223,2,223,1005,224,614,101,1,223,223,108,226,677,224,102,2,223,223,1005,224,629,101,1,223,223,8,677,226,224,102,2,223,223,1006,224,644,1001,223,1,223,1007,677,677,224,1002,223,2,223,1006,224,659,1001,223,1,223,1008,677,677,224,1002,223,2,223,1005,224,674,101,1,223,223,4,223,99,226];
let test = [1101,100,-1,4,0];


class IntCodeComputer {
    constructor(){
        this.program = [];
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

            case 3: // input
                this.program[this.program[this.pos+1]] = this.input;
                this.pos += 2;
                break;

            case 4: // output
                this.output.push(this.getNum(mode[0], this.program[this.pos+1]));
                this.pos += 2;
                break;
            
            case 5: // jump if true (1st param non-zero)
                if(this.getNum(mode[0], this.program[this.pos +1]) != 0){
                    this.progam[this.program[this.pos]] = this.getNum(mode[1], this.program[this.pos +2]);
                }
                else{
                    this.pos += 2;
                }
                break;
            
            case 6: // jump if false
                if(this.getNum(mode[0], this.program[this.pos +1]) == 0){
                    this.progam[this.progam[this.pos]] = this.getNum(mode[1], this.program[this.pos +2]);
                }
                else{
                    this.pos += 2;
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

    run(program, input){
        this.program = program;
        this.input = input;

        while(program[this.pos] != 99){
            const [op, ...mode] = this.readOp(this.program[this.pos]);
            this.runOp(op, mode);
        }
        return this.output;
    }
}

let computer = new IntCodeComputer();
let output = computer.run(real, 5);
console.log(output);
