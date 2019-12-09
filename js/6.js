const path = require("path");
const fs = require("fs");

const input = fs.readFileSync(
    path.resolve(__dirname, "d6.txt"),
    "UTF-8"
);

const test = 
[
'COM)B',
'B)C',
'C)D',
'D)E',
'E)F',
'B)G',
'G)H',
'D)I',
'E)J',
'J)K',
'K)L',
'K)YOU',
'I)SAN'
]


const genList = (input) => {
    let ll = {}; // linked list

    for(let i = 0; i<input.length; i++){
        let a = input[i].split(')')[0];
        let b = input[i].split(')')[1];
        ll[b] = a;
    }

    return ll; 
}

const countOrbits = (ll, tail) => {
    let count = 0;
    let cur = null;
    let keys = Object.keys(ll);
    

    keys.map((key) => {
        cur = ll[key];
        count += 1;
        while(cur != tail){
            // console.log(cur);
            cur = ll[cur];
            count += 1;
        }
    })

    return count;
}

const countPath = (ll, start, tail) => {
    let cur = start;
    let count = -1;
    while(cur != tail){
        if(paths[cur]){
            console.log('shortest path found');
            console.log(count + paths[cur]);
            return count + paths[cur];
            
        }
        paths[cur] = count;
        count += 1;
        cur = ll[cur];
    }
}

let paths = {}; 
let tail = 'COM';
let ll = genList(input.split('\n'));
// let ll = genList(test);
countPath(ll, 'YOU', tail);
countPath(ll, 'SAN', tail);



