import { Image } from '@/components/ui/image';
import { motion } from 'framer-motion';
import { Home, RotateCcw } from 'lucide-react';
import { PORTRAIT_URL } from '@/components/game/assets';

export default function GameOverScreen({ height = 0, best = 0, isRecord, onRestart, onMenu }) {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-[#05070B] px-5 py-12 text-[#F4F3F1]">
      <div className="w-full max-w-lg">
        <p className="font-body text-[10px] uppercase tracking-[0.34em] text-[#C09B45]">
          Протокол падения
        </p>
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 font-heading text-[clamp(3rem,13vw,5.4rem)] font-black uppercase leading-[0.85] tracking-[-0.04em] text-[#B91C1C]"
        >
          Падение
        </motion.h1>
        <p className="mt-4 font-body text-sm leading-relaxed text-[#C9D2DD]">
          Чугун упал с высоты {height} метров
        </p>

        <div className="mt-7 flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-3">
          <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full border border-[#C09B45]/40">
            <Image
              src={PORTRAIT_URL}
              alt="Волегов Сергей Александрович"
              className="h-full w-full"
              fittingType="fill"
              focalPointY={0.3}
            />
          </div>
          <div>
            <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.12em]">
              Приговор вынесен
            </p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2">
          {[
            ['Высота', `${height} м`],
            ['Рекорд', `${best} м`],
          ].map(([label, val]) => (
            <div key={label} className="rounded-xl border border-white/10 bg-[#0B0F16] px-3 py-4 text-center">
              <p className="font-heading text-lg font-extrabold tabular-nums">{val}</p>
              <p className="mt-1 font-body text-[8px] uppercase tracking-[0.22em] text-white/35">{label}</p>
            </div>
          ))}
        </div>

        {isRecord && (
          <p className="mt-4 rounded-xl border border-[#C09B45]/40 bg-[#C09B45]/10 px-4 py-3 text-center font-body text-[10px] uppercase tracking-[0.24em] text-[#C09B45]">
            Новый рекорд кафедры
          </p>
        )}

        <div className="mt-7 flex flex-col gap-3">
          <button
            onClick={onRestart}
            className="inline-flex items-center justify-center gap-3 rounded-full bg-[#C09B45] px-7 py-4 font-body text-[11px] font-bold uppercase tracking-[0.2em] text-[#0A0A0A] transition hover:bg-[#D9B45C]"
          >
            <RotateCcw className="h-4 w-4" />
            Пересдать
          </button>
          <button
            onClick={onMenu}
            className="inline-flex items-center justify-center gap-3 rounded-full border border-white/20 px-7 py-4 font-body text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70 transition hover:border-white/50 hover:text-white"
          >
            <Home className="h-4 w-4" />
            В меню
          </button>
        </div>
      </div>
    </div>
  );
}