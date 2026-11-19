import { Image } from '@/components/ui/image';
import { ArrowRight } from 'lucide-react';
import { PORTRAIT_URL } from '@/components/game/assets';

export default function StartHero({ onStart, best = 0 }) {
  return (
    <div className="flex flex-col items-center">
      <p className="font-body text-[9px] uppercase tracking-[0.34em] text-[#C09B45]">
        УГГУ · 1914 · процессы формообразования
      </p>

      <div className="relative mt-8 w-[230px] sm:w-[280px]">
        <div aria-hidden className="absolute -inset-5 rounded-[40px] bg-[#C09B45]/20 blur-3xl" />
        <div className="relative overflow-hidden rounded-[26px] border border-[#C09B45]/40 bg-[#0B0F16] p-1.5 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.95)]">
          <div className="overflow-hidden rounded-[20px]">
            <Image
              src={PORTRAIT_URL}
              alt="Волегов Сергей Александрович"
              className="aspect-[4/5] w-full"
              fittingType="fill"
              focalPointY={0.28}
            />
          </div>
        </div>
        <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-[#C09B45]/50 bg-[#05070B] px-3 py-1 font-body text-[8px] uppercase tracking-[0.24em] text-[#C09B45]">
          Волегов С. А.
        </span>
      </div>

      <h1 className="mt-11 font-heading text-[clamp(1.9rem,6.6vw,3.9rem)] font-black uppercase leading-[0.92] tracking-[-0.035em]">
        Чугунный Лорд:
        <br />
        <span className="text-[#C09B45]">Возмездие</span>
      </h1>

      <p className="mt-5 max-w-[44ch] font-body text-[13px] leading-relaxed text-[#C9D2DD] sm:text-sm">
        Прыгай по партам вместе с Чугунным Лордом
      </p>

      <div className="mt-8 flex flex-col items-center gap-3">
        <button
          onClick={onStart}
          className="group inline-flex items-center gap-3 rounded-full bg-[#C09B45] px-8 py-4 font-body text-[11px] font-bold uppercase tracking-[0.2em] text-[#0A0A0A] transition hover:bg-[#D9B45C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C09B45]"
        >
          Начать
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
        <span className="font-body text-[9px] uppercase tracking-[0.24em] text-white/35">
          Рекорд кафедры: {best} м
        </span>
      </div>
    </div>
  );
}