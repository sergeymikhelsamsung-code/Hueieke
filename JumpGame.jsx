import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Smartphone, X } from 'lucide-react';
import { Image } from '@/components/ui/image';
import useJumpEngine from '@/components/game/useJumpEngine';
import useTilt from '@/components/game/useTilt';
import JumpPlatform from '@/components/game/JumpPlatform';
import JumpStudent from '@/components/game/JumpStudent';
import JumpPickup from '@/components/game/JumpPickup';
import { PORTRAIT_URL } from '@/components/game/assets';

export default function JumpGame({ best = 0, onFinish, onExit }) {
  const arenaRef = useRef(null);
  const pressedRef = useRef(false);
  const [size, setSize] = useState(null);

  useEffect(() => {
    const el = arenaRef.current;
    if (!el) return undefined;
    const measure = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      setSize((prev) => (prev && Math.abs(prev.w - w) < 2 && Math.abs(prev.h - h) < 2 ? prev : { w, h }));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const handleDead = useCallback((height) => onFinish({ height }), [onFinish]);
  const { world, setDir } = useJumpEngine(size, handleDead);
  const { tiltOn, toggle: toggleTilt } = useTilt(setDir);

  useEffect(() => {
    const left = ['ArrowLeft', 'a', 'A', 'ф', 'Ф'];
    const right = ['ArrowRight', 'd', 'D', 'в', 'В'];
    const down = (e) => {
      if (left.includes(e.key)) setDir(-1);
      else if (right.includes(e.key)) setDir(1);
      else return;
      e.preventDefault();
    };
    const up = (e) => {
      if (left.includes(e.key) || right.includes(e.key)) setDir(0);
    };
    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
    };
  }, [setDir]);

  const aim = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setDir(e.clientX - rect.left < rect.width / 2 ? -1 : 1);
  };

  const onDown = (e) => {
    pressedRef.current = true;
    e.currentTarget.setPointerCapture?.(e.pointerId);
    aim(e);
  };

  const onUp = () => {
    pressedRef.current = false;
    setDir(0);
  };

  const height = Math.floor(world?.height ?? 0);
  const camTop = world?.camTop ?? 0;
  const playerTop = world ? world.y - camTop : 0;
  const tilt = world ? Math.max(-12, Math.min(12, world.vx / 28)) : 0;
  const stretch = world ? Math.min(0.14, Math.abs(world.vy) / 9000) : 0;
  const viewH = size?.h ?? 0;
  const boosted = (world?.boost ?? 0) > 0;
  const slowed = (world?.slow ?? 0) > 0;

  return (
    <div className="flex min-h-[100dvh] flex-col bg-[#05070B] px-3 py-3 text-[#F4F3F1] sm:px-5 sm:py-5">
      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="rounded-full border border-[#C09B45]/40 bg-[#C09B45]/10 px-3 py-1.5 font-body text-[9px] uppercase tracking-[0.2em] text-[#C09B45]">
              Высота <span className="font-heading text-[11px] font-bold tabular-nums">{height}</span> м
            </span>
            <span className="rounded-full border border-white/15 px-3 py-1.5 font-body text-[9px] uppercase tracking-[0.2em] text-white/50">
              Рекорд <span className="font-heading text-[11px] font-bold text-white/80 tabular-nums">{best}</span> м
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTilt}
              aria-pressed={tiltOn}
              aria-label="Управление наклоном телефона"
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-2 font-body text-[8px] uppercase tracking-[0.18em] transition ${
                tiltOn
                  ? 'border-[#C09B45] bg-[#C09B45]/15 text-[#C09B45]'
                  : 'border-white/15 text-white/45 hover:border-white/40 hover:text-white'
              }`}
            >
              <Smartphone className="h-3.5 w-3.5" />
              наклон
            </button>
            <button
              onClick={onExit}
              aria-label="Выйти в меню"
              className="rounded-full border border-white/15 p-2 text-white/50 transition hover:border-white/40 hover:text-white"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <div
          ref={arenaRef}
          onPointerDown={onDown}
          onPointerMove={(e) => pressedRef.current && aim(e)}
          onPointerUp={onUp}
          onPointerCancel={onUp}
          onPointerLeave={onUp}
          className="chalk relative min-h-[480px] flex-1 touch-none select-none overflow-hidden rounded-3xl border border-white/10 bg-[#08101A]"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(130%_80%_at_50%_0%,rgba(0,92,158,0.28),transparent_60%)]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_70%_at_50%_110%,rgba(185,28,28,0.2),transparent_62%)]"
          />

          {world && (boosted || slowed) && (
            <div className="pointer-events-none absolute left-1/2 top-3 z-30 flex -translate-x-1/2 gap-2 whitespace-nowrap">
              {boosted && (
                <span className="rounded-full border border-[#F5D77A]/60 bg-[#C09B45]/25 px-3 py-1 font-body text-[8px] uppercase tracking-[0.2em] text-[#F5D77A]">
                  турбо {Math.ceil(world.boost)} с
                </span>
              )}
              {slowed && (
                <span className="rounded-full border border-[#94A3B8]/60 bg-[#94A3B8]/15 px-3 py-1 font-body text-[8px] uppercase tracking-[0.2em] text-[#CBD5E1]">
                  тормоз {Math.ceil(world.slow)} с
                </span>
              )}
            </div>
          )}

          {world &&
            world.platforms.map((p) => {
              const top = p.y - camTop;
              if (top < -60 || top > viewH + 40) return null;
              return <JumpPlatform key={p.id} platform={p} top={top} />;
            })}

          {world &&
            world.enemies.map((enemy) => {
              const top = enemy.y - camTop;
              if (top < -80 || top > viewH + 60) return null;
              return <JumpStudent key={enemy.id} student={enemy} top={top} />;
            })}

          {world &&
            world.pickups.map((pickup) => {
              const top = pickup.y - camTop;
              if (top < -80 || top > viewH + 60) return null;
              return <JumpPickup key={pickup.id} pickup={pickup} top={top} />;
            })}

          {world && (
            <div
              className="absolute z-20"
              style={{
                left: world.x,
                top: playerTop,
                transform: `translate(-50%, -50%) rotate(${tilt}deg) scaleY(${1 - stretch})`,
              }}
            >
              <div
                className={`h-[54px] w-[54px] overflow-hidden rounded-full border-2 bg-[#141A24] ${
                  boosted
                    ? 'border-[#F5D77A] shadow-[0_0_38px_-2px_rgba(245,215,122,1)]'
                    : slowed
                      ? 'border-[#94A3B8] opacity-70 shadow-[0_0_20px_-6px_rgba(148,163,184,0.8)]'
                      : 'border-[#C09B45] shadow-[0_0_28px_-4px_rgba(192,155,69,0.9)]'
                }`}
              >
                <Image
                  src={PORTRAIT_URL}
                  alt="Волегов Сергей Александрович"
                  className="h-full w-full"
                  fittingType="fill"
                  focalPointY={0.3}
                />
              </div>
            </div>
          )}

          <div className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-between px-4 text-white/20">
            <ChevronLeft className="h-6 w-6" />
            <ChevronRight className="h-6 w-6" />
          </div>
        </div>

        <p className="text-center font-body text-[9px] uppercase tracking-[0.24em] text-white/30">
          наклон телефона · держи палец слева или справа · ← → на клавиатуре
        </p>
      </div>
    </div>
  );
}