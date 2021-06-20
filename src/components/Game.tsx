import React, { useEffect, useRef } from 'react';

import { CANVAS_RECT } from '../constants';

import { audioBGM, audioClear, audioFail, audioHit } from '../constants/audios';

import Ball from '../utils/Ball';
import Paddle from '../utils/Paddle';
import Score from '../utils/Score';
import Bricks from '../utils/Bricks';
import Brick from '../utils/Brick';

interface Props {
  drawSpeed: number;
  brickLife: number;
  onGameOvered: (finalScore: number, isGameCleared: boolean) => void;
  isSoundOn: boolean;
}

const Game: React.FC<Props> = ({
  drawSpeed,
  brickLife,
  onGameOvered,
  isSoundOn,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isSoundOnRef = useRef(isSoundOn);
  let ball = new Ball();
  let paddle = new Paddle();
  let score = new Score();
  let bricks = new Bricks(brickLife);
  const rightPressed = useRef(false);
  const leftPressed = useRef(false);

  function collisionDetection() {
    for (var c = 0; c < bricks.columnCount; c++) {
      for (var r = 0; r < bricks.rowCount; r++) {
        var b = bricks.items[c][r] as Brick;
        if (b.life > 0) {
          // x, y means ball axises
          // ボールのx座標がブロックのx座標より大きい;
          // ボールのx座標がブロックのx座標とその幅の和より小さい;
          // ボールのy座標がブロックのy座標より大きい;
          // ボールのy座標がブロックのy座標とその高さの和より小さい;
          if (
            ball.x > b.x &&
            ball.x < b.x + b.width &&
            ball.y > b.y &&
            ball.y < b.y + b.height
          ) {
            ball.invertDy();
            b.decrementLife();
            score.incrementCount();
            if (isSoundOnRef.current) {
              audioHit.currentTime = 0;
              audioHit.play();
            }
          }
        }
      }
    }
  }

  function draw() {
    let ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, CANVAS_RECT.width, CANVAS_RECT.height);

      ball.draw(ctx);
      paddle.draw(ctx);
      bricks.drawItems(ctx);
      score.draw(ctx);

      collisionDetection();

      if (score.count === bricks.rowCount * bricks.columnCount * bricks.life) {
        if (isSoundOnRef.current) {
          audioClear.currentTime = 0;
          audioClear.play();
        }
        onGameOvered(score.count, true);
        return;
      }

      if (
        ball.x + ball.dx > CANVAS_RECT.width - ball.radius ||
        ball.x + ball.dx < ball.radius
      ) {
        ball.invertDx();
      }

      if (ball.y + ball.dy < ball.radius) {
        ball.invertDy();
      } else if (ball.y + ball.dy > CANVAS_RECT.height - ball.radius) {
        if (ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
          ball.invertDy();
        } else {
          if (isSoundOnRef.current) {
            audioFail.currentTime = 0;
            audioFail.play();
          }
          onGameOvered(score.count, false);
          return;
        }
      }

      if (rightPressed.current && paddle.x < CANVAS_RECT.width - paddle.width) {
        paddle.moveRight();
      } else if (leftPressed.current && paddle.x > 0) {
        paddle.moveLeft();
      }

      ball.moveX();
      ball.moveY();
    }
  }

  useEffect(() => {
    isSoundOnRef.current = isSoundOn;
  }, [isSoundOn]);

  useEffect(() => {
    if (isSoundOn) {
      if (audioBGM.paused) {
        audioBGM.loop = true;
        audioBGM.play();
      } else {
        audioBGM.loop = true;
        audioBGM.currentTime = 0;
        audioBGM.play();
      }
    } else {
      audioBGM.pause();
    }

    return () => {
      audioBGM.pause();
    };
  }, [isSoundOn]);

  useEffect(() => {
    const onKeyDown: (e: KeyboardEvent) => void = (e) => {
      switch (e.code) {
        case 'ArrowRight':
        case 'KeyD':
          rightPressed.current = true;
          break;
        case 'ArrowLeft':
        case 'KeyA':
          leftPressed.current = true;
          break;
      }
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  useEffect(() => {
    const onKeyUp: (e: KeyboardEvent) => void = (e) => {
      switch (e.code) {
        case 'ArrowRight':
        case 'KeyD':
          rightPressed.current = false;
          break;
        case 'ArrowLeft':
        case 'KeyA':
          leftPressed.current = false;
          break;
      }
    };
    window.addEventListener('keyup', onKeyUp);

    return () => {
      window.removeEventListener('keyup', onKeyUp);
    };
  }, []);

  useEffect(() => {
    const onMouseMove: (e: MouseEvent) => void = (e) => {
      const offsetLeft = canvasRef.current?.offsetLeft || 0;
      const relativeX = e.clientX - offsetLeft;

      if (relativeX > 0 && relativeX < CANVAS_RECT.width) {
        paddle.x = relativeX - paddle.width / 2;
      }
    };
    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  useEffect(() => {
    let interval: number;

    interval = window.setInterval(() => {
      draw();
    }, 1000 / drawSpeed);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        width={CANVAS_RECT.width}
        height={CANVAS_RECT.height}
      ></canvas>
    </>
  );
};

export default Game;
