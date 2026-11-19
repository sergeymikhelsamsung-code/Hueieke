import { useState } from 'react';
import { Image } from '@/components/ui/image';
import { BUILDING_URL } from '@/components/game/assets';
import StartHero from '@/components/game/StartHero';
import SourceView from '@/components/game/SourceView';

const TABS = [
  { id: 'play', label: 'Игра' },
  { id: 'code', label: 'Исходный код' },
];

export default function StartScreen({ onStart, best = 0 }) {
  const [tab, setTab] = useState('play');

  return (
    <div className="min-h-[100dvh] bg-[#05070B] text-[#F4F3F1]">
      <section className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-5 py-10 text-center sm:px-6">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <Image
            src={BUILDING_URL}
            alt="Здание Горного института УГГУ"
            className="h-full w-full object-cover"
            fittingType="fill"
          />
          <div className="absolute inset-0 bg-[#05070B]/55" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#05070B]/95 via-[#05070B]/25 to-[#05070B]" />
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_55%_at_50%_16%,rgba(0,92,158,0.4)_0%,rgba(1,10,22,0)_70%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(65%_38%_at_50%_102%,rgba(192,155,69,0.16)_0%,rgba(1,10,22,0)_72%)]"
        />

        <div className="relative flex w-full max-w-3xl flex-col items-center gap-6">
          <div className="inline-flex rounded-full border border-white/10 bg-white/[0.04] p-1 backdrop-blur">
            {TABS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 font-body text-[9px] uppercase tracking-[0.2em] transition ${
                  tab === id
                    ? 'bg-[#C09B45] text-[#0A0A0A]'
                    : 'text-white/50 hover:text-white/85'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {tab === 'play' ? <StartHero onStart={onStart} best={best} /> : <SourceView />}
        </div>
      </section>
    </div>
  );
}