import { useState } from 'react';
function Example1() {
    const [color,setColor]=useState("Blue");
    function changeColor(){
        setColor("Red");
        console.log(color);
    }

    return (
        <div>
            <h1>Favorite Color is {color}</h1>
            <button onClick={changeColor}>Red</button>
        </div>
    );

}
export default Example1;