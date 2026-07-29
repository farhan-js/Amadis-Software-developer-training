import { useState } from 'react';
function Example3() {
    const [count, setCount] = useState(0);

    function counter() {
        setCount((p)=>p + 2); 
        setCount((p)=>p + 2); 
        setCount((p)=>p + 2);
        setCount((p)=>p + 2);
        setCount((p)=>p + 2);

    }
    return (
        <div>
            <h1>Count {count}</h1>
            <button onClick={counter}>increase</button>
        </div>
    );

}
export default Example3;