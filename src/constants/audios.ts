import bgm from '../assets/audios/bgm.mp3';
import move from '../assets/audios/move.mp3';
import fail from '../assets/audios/fail.mp3';
import clear from '../assets/audios/clear.mp3';
import hit from '../assets/audios/hit.mp3';

// BGM
export const audioBGM = new Audio(bgm);

// 手動移動/回転サウンド
export const audioMove = new Audio(move);

// ゲーム失敗サウンド
export const audioFail = new Audio(fail);

// ゲームクリアサウンド
export const audioClear = new Audio(clear);

// カウントダウンサウンド
export const audioCountdown = new Audio(move);

// ヒットサウンド
export const audioHit = new Audio(hit);
