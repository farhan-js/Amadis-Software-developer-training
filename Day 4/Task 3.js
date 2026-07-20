var name="Farhan";
var mark=90;
var grade;
if(mark>90){
    grade='O';
}
else if(mark <=90 && mark>80){
    grade='A';
}
else if(mark <=80 && mark>70){
    grade='B';
}
else if(mark <=70 && mark>60){
    grade='C';
}
else if(mark <=60 && mark>50){
    grade='D';
}
else if(mark <=50 && mark>40){
    grade='E';
}
else{
    grade="F";
}

switch(grade){
    case 'O':
        console.log("Rank : 1");
        break;
    case 'A':
        console.log("Rank : 2");
        break;
    case 'B':
        console.log("Rank : 3");
        break;
    case 'C':
        console.log("Rank : 4");
        break;
    case 'D':
        console.log("Rank : 5");
        break;
    case 'E':
        console.log("Rank : 6");
        break;
    case 'F':
        console.log("Fail");
        break;

}
