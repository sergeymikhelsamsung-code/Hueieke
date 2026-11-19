import { useCallback, useState } from 'react';
import StartScreen from '@/components/game/StartScreen';
import JumpGame from '@/components/game/JumpGame';
import GameOverScreen from '@/components/game/GameOverScreen';

const BEST_KEY = 'chugun_best_height';
const readBest = () => Number(localStorage.getItem(BEST_KEY) || 0);

export default function Game() {
  const [screen, setScreen] = useState('start');
  const [best, setBest] = useState(readBest);
  const [round, setRound] = useState(0);
  const [result, setResult] = useState({ height: 0, isRecord: false });

  const start = () => {
    setRound((r) => r + 1);
    setScreen('playing');
  };

  const finish = useCallback(({ height }) => {
    const prev = readBest();
    const isRecord = height > prev;
    if (isRecord) localStorage.setItem(BEST_KEY, String(height));
    setBest(Math.max(prev, height));
    setResult({ height, isRecord });
    setScreen('over');
  }, []);

  if (screen === 'playing') {
    return <JumpGame key={round} best={best} onFinish={finish} onExit={() => setScreen('start')} />;
  }

  if (screen === 'over') {
    return (
      <GameOverScreen
        height={result.height}
        best={best}
        isRecord={result.isRecord}
        onRestart={start}
        onMenu={() => setScreen('start')}
      />
    );
  }

  return <StartScreen onStart={start} best={best} />;
}