let arr =[2,4,5,6];
arr.push(9);
arr.unshift(1);
console.log(arr);

arr.pop();
arr.shift();
console.log(arr);

arr.splice(1,1,3,4);
console.log(arr);

let arrSub=arr.slice(0,3);
console.log(arrSub);

arr=arr.concat(arrSub);
console.log(arr);

arrSub.reverse();
console.log(arrSub);


arr=arr.join("*");
console.log(arr);
// let arr1=[1,2,3,4];
// let arr2=[4,3,2,1,5];
// // arr1.concat(arr2);
// console.log(arr1.concat(arr2));
