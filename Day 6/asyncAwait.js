async function getUser(){
    try{
    let content=await fetch("https://jsonplaceholder.typicode.com/users/1");
    let user=await content.json();
    console.log(user);
    console.log(user.name);
    console.log(user.company.name);
    }
    catch(err){
        console.error("Error occured :",err);
    }
}  
getUser();