import { useState } from 'react';

function ColorCounter() {
  const [count, setCount] = useState(0);
  const getColor = (num:any) => {
    if (num >= 0 && num < 10) return 'blue';
    if (num >= 10 && num < 20) return 'green';
    if (num >= 20 && num <= 30) return 'red';
    return 'black'; 
  };

  const currentColor = getColor(count);

  return (
    <div style={{ textAlign: 'center', marginTop: '40px' }}>
      <h1 style={{ color: currentColor, fontSize: '48px' }}>
        {count}
      </h1>

      <p>Current Color: <strong>{currentColor}</strong></p>

      <button onClick={() => setCount(count + 1)}>Increment (+)</button>
      <button onClick={() => setCount(count - 1)} style={{ marginLeft: '10px' }}>
        Decrement (-)
      </button>
    </div>
  );
}

export default ColorCounter;