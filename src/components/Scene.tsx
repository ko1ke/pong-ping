import React, { useCallback, useState } from 'react';
import Intro from './scenes/Intro';
import CountDown from './scenes/CountDown';
import Stage from './scenes/Stage';
import Result from './scenes/Result';
type SceneName = 'intro' | 'countDown' | 'stage' | 'result';

const Scene = () => {
  const [scene, setScene] = useState<SceneName>('intro');
  const [score, setScore] = useState(0);
  const [drawSpeed, setDrawSpeed] = useState(100);
  const [isCleared, setIsCleared] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(false);

  const handleGameOvered = useCallback(
    (finalScore: number, isGameCleared: boolean) => {
      setScene('result');
      setScore(finalScore);
      setIsCleared(isGameCleared);
    },
    []
  );

  const toggleIsSoundOn = useCallback(() => {
    setIsSoundOn((current: boolean) => !current);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center w-full h-full min-h-screen p-8">
      <div className="text-right w-full">
        <button
          className={`bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center ${
            isSoundOn ? 'text-opacity-100' : 'text-opacity-40'
          }`}
          onClick={toggleIsSoundOn}
        >
          {isSoundOn ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                clipRule="evenodd"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
              />
            </svg>
          )}
        </button>
      </div>

      <div className="flex flex-col py-2 justify-center items-center">
        {scene === 'intro' ? (
          <Intro
            setDrawSpeed={setDrawSpeed}
            onClickStart={() => setScene('countDown')}
          />
        ) : scene === 'countDown' ? (
          <CountDown
            onCountOvered={() => setScene('stage')}
            isSoundOn={isSoundOn}
          />
        ) : scene === 'stage' ? (
          <Stage
            drawSpeed={drawSpeed}
            onGameOvered={handleGameOvered}
            isSoundOn={isSoundOn}
          />
        ) : (
          scene === 'result' && (
            <Result
              score={score}
              isCleared={isCleared}
              onClickRetry={() => setScene('countDown')}
            />
          )
        )}
      </div>
    </div>
  );
};

export default Scene;
