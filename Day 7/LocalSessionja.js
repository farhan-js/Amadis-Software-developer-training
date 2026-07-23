
localStorage.setItem("name", "Farhan");
let name = localStorage.getItem("name");
console.log(name);
localStorage.setItem("name", "Aathil");
localStorage.removeItem("name");
localStorage.clear();

sessionStorage.setItem("city", "Chennai");
let city = sessionStorage.getItem("city");
console.log(city);
sessionStorage.setItem("city", "Madurai");
sessionStorage.removeItem("city");
sessionStorage.clear();