import { memo, useMemo, useState } from 'react';

function getRandomHexColor() {
  const randomHex = Math.floor(Math.random() * 16777215).toString(16);
  return '#' + '0'.repeat(6 - randomHex.length) + randomHex;
}

export function ComponentA() {
  const [color] = useState(() => getRandomHexColor());

  return (
    <div className="w-full h-full" style={{ backgroundColor: color }}></div>
  );
}

export default memo(ComponentA);
