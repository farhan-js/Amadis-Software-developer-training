import { useState } from 'react';
function Example2() {
    const [brand, setBrand] = useState({
        "name":"Ferrari",
        "model":"Roma",
        "year":"2020",
        "color":"blue"
    });

    // function changeBrand() {
    //     setBrand(
    //         {color:"Red"}
    //     );

    // }
    function changeBrand() {
        setBrand(
            {
                name:"A",
                model:"AA",
                year:"2003",
                color:"Red"
            }
            
        );

    }
    return (
        <div>
            <h1>My {brand.name}</h1>
            <h3> it is {brand.model} {brand.year} {brand.color}</h3>
            <button onClick={changeBrand}>Red</button>
        </div>
    );

}
export default Example2;