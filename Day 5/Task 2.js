console.log("Functions")
const a=5;
const b=8;
let add= function(a,b){
    return a+b;

}
let sub=function(a,b){
    return a-b;
}
let multi=(a,b) => a*b;
let div=(a,b) => a/b;

console.log("Addition :",add(a,b));
console.log("Subraction :",sub(a,b));
console.log("Multiplication :",multi(a,b));
console.log("Division :",div(a,b));


function fact(n){
    if (n==1){
        return 1;
    }
    else{
        return (n*fact(n-1));
    }
}
console.log("Factorial of ",a,fact(a));
console.log("Factorial of ",b,fact(b));
