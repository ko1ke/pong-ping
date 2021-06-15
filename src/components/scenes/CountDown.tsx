import React, { useEffect, useRef, useState } from 'react';

import { COUNT_DOWN_START } from '../../constants/index';
import { audioCountdown } from '../../constants/audios';

type Props = {
  onCountOvered: () => void;
  isSoundOn: boolean;
};
const CountDown: React.FC<Props> = ({ onCountOvered, isSoundOn }) => {
  const [count, setCount] = useState(COUNT_DOWN_START);
  const isSoundOnRef = useRef(isSoundOn);

  useEffect(() => {
    if (count <= 0) {
      onCountOvered();
    }
  }, [count]);

  useEffect(() => {
    isSoundOnRef.current = isSoundOn;
  }, [isSoundOn]);

  useEffect(() => {
    let timer: number;
    const step = () => {
      if (isSoundOnRef.current) {
        audioCountdown.currentTime = 0; // Audioの頭出し
        audioCountdown.play();
      }
      setCount((current: number) => current - 1);
      timer = window.setTimeout(step, 1000);
    };

    if (isSoundOnRef.current) {
      audioCountdown.currentTime = 0; // Audioの頭出し
      audioCountdown.play();
    }
    timer = window.setTimeout(step, 1000);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  if (count <= 0) {
    return null;
  } else {
    return (
      <div className="flex flex-col justify-center items-center w-full">
        <p className="text-7xl font-bold pb-8">{count}</p>
      </div>
    );
  }
};

export default CountDown;
