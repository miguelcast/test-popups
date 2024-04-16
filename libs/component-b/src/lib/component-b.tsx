import { memo, useState } from 'react';

export function ComponentB() {
  const [color, setColor] = useState('#3498db');

  const changeColor = () => {
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    setColor(randomColor);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <button
        style={{
          backgroundColor: color,
          padding: '10px 20px',
          borderRadius: '5px',
          border: 'none',
          color: 'white',
          fontSize: '16px',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease',
        }}
        onClick={changeColor}
      >
        ¡Haz clic para cambiar el color!
      </button>
    </div>
  );
}

export default memo(ComponentB);
