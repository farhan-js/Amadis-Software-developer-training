class Student{

    constructor(name,age){
        this.name = name;
        this.age = age;
    };
    display(){
        console.log(this.name);
    }
}
let s1 =new Student("Farhan",23);
s1.display();

function stu(name,age){
    this.name=name;
    this.age=age;
}
const a=new stu("aathil",21);
const b=new stu("farhan",29);
console.log(a.name);
console.log(b);
