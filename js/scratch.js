class Test {
    constructor(arr){
        this.arr = arr;
    }

    setArr(arr){
        this.arr = arr;
    }
}

let a = [1,2,3,4,5];
const setArr = (arr) => {
    for(let i =0; i<3; i++){
        console.log(arr);
        let t = new Test(arr);
        t.setArr([5,4,3,2,1]);
    }
}

setArr(a);

