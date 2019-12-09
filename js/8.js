const path = require("path");
const fs = require("fs");

const input = fs.readFileSync(
    path.resolve(__dirname, "d8.txt"),
    "UTF-8"
);

// 25 wide, 6 tall
// 25 * 6 = 150px per layer
const test = '0222112222120000'.split('');
const pxs = input.split('');
let min = Infinity;
let layer = null;

for(let i = 0; i<pxs.length; i+=150){
    let count = 0;
    for(let j=i; j<i+150; j++){
        if(pxs[j] == 0){
            count++;
        }
    }
    if(count < min){
        min = count;
        layer = i/150;
    }
}

let ones = 0;
let twos = 0;
// seems like layer #5 is the layer
for(let k = 150*layer; k<150*(layer+1); k++){
    if(pxs[k] == 1){
        ones++;
    }
    if(pxs[k] == 2){
        twos++;
    } 
}

// part one, counting ones and twos
// console.log(ones);
// console.log(twos);

// 0 is black
// 1 is white
// 2 is transparent

let pic = [[],[],[],[],[],[]];
for(let i = 0; i<pxs.length; i+=150){
    for(let j=i; j<i+150; j++){
        let index = j-i;
        let x = Math.floor(index/25);
        let y = index%25;
        if(pic[x][y] == undefined){
            pic[x][y] = pxs[j];
        }
        else{
            pic[x][y] = pic[x][y] == 2 ? pxs[j] : pic[x][y];
        }
    }
}
