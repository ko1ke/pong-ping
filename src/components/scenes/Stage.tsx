import React, { useCallback } from 'react';
import Game from '../Game';

type Props = {
  drawSpeed: number;
  brickLife: number;
  onGameOvered: (finalScore: number, isGameCleared: boolean) => void;
  isSoundOn: boolean;
};

const Stage: React.FC<Props> = ({
  drawSpeed,
  brickLife,
  onGameOvered,
  isSoundOn,
}) => {
  const handleGameOvered = useCallback(
    (finalScore: number, isGameCleared: boolean) => {
      onGameOvered(finalScore, isGameCleared);
    },
    []
  );

  return (
    <>
      <div className="flex flex-col items-center w-full">
        <Game
          drawSpeed={drawSpeed}
          brickLife={brickLife}
          onGameOvered={handleGameOvered}
          isSoundOn={isSoundOn}
        />
        <p>You can control the paddle by a mouse or arrow keys on a keyboard</p>
      </div>
    </>
  );
};

export default Stage;
