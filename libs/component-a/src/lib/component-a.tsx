import { memo, useState } from 'react';

import { getRandomHexColor } from '../utils/getRandomHexColor';

export function ComponentA() {
  const [color] = useState(() => getRandomHexColor());

  return (
    <div className="w-full h-full" style={{ backgroundColor: color }}></div>
  );
}

export default memo(ComponentA);
