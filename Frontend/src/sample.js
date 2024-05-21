let myF = (a,b,c) =>{
    return [a,b,c,a,b,c]
}

let result1 =myF.length
let result2 = myF(1,2,3,4,5,6).length

console.log(result1)
console.log(result2)
console.log(myF(1,2))