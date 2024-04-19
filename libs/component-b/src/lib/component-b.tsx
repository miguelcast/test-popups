import { memo, useEffect, useState } from 'react';

export function ComponentB() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;

    if (isRunning) {
      intervalId = setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning]);

  const startStop = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  };

  const reset = () => {
    setElapsedTime(0);
    setIsRunning(false);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <div className="h-full grid place-content-center">
      <div className="text-5xl font-black tabular-nums flex justify-center">
        <span>{formatTime(elapsedTime)}</span>
      </div>
      <div className="flex justify-center gap-8 mt-4">
        <button
          className="bg-white h-auto px-4 py-1 rounded-full font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-500"
          onClick={startStop}
        >
          {isRunning ? 'Stop' : 'Start'}
        </button>
        <button
          className="bg-white h-auto px-4 py-1 rounded-full font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-500"
          onClick={reset}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default memo(ComponentB);
