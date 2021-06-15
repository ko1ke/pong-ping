import React from 'react';
import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'react-confetti';

type Props = {
  score: number;
  isCleared: boolean;
  onClickRetry: () => void;
};

const Result: React.FC<Props> = ({ score, isCleared, onClickRetry }) => {
  const { width, height } = useWindowSize();

  return (
    <div className="flex flex-col items-center w-full">
      <h1 className="text-5xl font-bold p-8">Result</h1>
      <p className="text-7xl font-bold pb-8">{score.toLocaleString()}</p>

      {isCleared && <Confetti width={width} height={height} />}
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={onClickRetry}
      >
        Retry
      </button>
    </div>
  );
};

export default Result;
