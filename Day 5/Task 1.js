

console.log("*******For loop*******");
for (let i=1;i<=5;i++){
    console.log(i);
}


console.log("*******While loop*******");
var i=1;
while(i<=5){
    console.log(i);
    i++;
    
}


console.log("*******Do while*******");
i=1;
do{
    console.log(i);
    i++;
}while(i<=5)

console.log("*******Break*******");
for (let i=1;i<=5;i++){
    if(i ==4){
        break;
    }
    console.log(i);
}

console.log("*******Continue*******");
for (let i=1;i<=5;i++){
    if(i ==4){
        continue;
    }
    console.log(i);
}
console.log("For of")
let numbers = [10, 20, 30];

for (let num of numbers) {
    console.log(num);
}

console.log("For in")
let person = {
    name: "Farhan",
    age: 22
};

for (let key in person) {
    console.log(key," ",person[key]);
}
