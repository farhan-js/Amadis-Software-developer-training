import {useState} from "react";
function Counter(){
    const [count,set]=useState(0);


    return(
        <div>
            <h3>{count}</h3>
            <button onClick={()=>set(count+1)}>Increase</button>
            <button onClick={()=>set(count>0?count-1:0)}>Decrease</button>
        </div>
    );
}
export default Counter;