import { useState } from 'react';
import { Check, Copy, Download, FileCode2 } from 'lucide-react';
import { SOURCE_FILES } from '@/components/game/sourceFiles';

const ALL_CODE = SOURCE_FILES.map((item) => `// ===== ${item.path} =====\n${item.code}`).join('\n\n');

export default function SourceView() {
  const [active, setActive] = useState(SOURCE_FILES[0]?.path);
  const [copied, setCopied] = useState(false);
  const file = SOURCE_FILES.find((item) => item.path === active) ?? SOURCE_FILES[0];
  if (!file) return null;

  const download = (item) => {
    const url = URL.createObjectURL(new Blob([item.code], { type: 'text/plain;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = item.label;
    link.click();
    URL.revokeObjectURL(url);
  };

  const copyAll = async () => {
    await navigator.clipboard.writeText(ALL_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative flex w-full flex-col gap-3 rounded-3xl border border-white/10 bg-[#070B12]/90 p-3 backdrop-blur sm:p-4">
      <div className="flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible">
        {SOURCE_FILES.map((item) => (
          <div key={item.path} className="flex shrink-0 items-center gap-1">
            <button
              onClick={() => setActive(item.path)}
              className={`rounded-full border px-3 py-1.5 font-mono text-[10px] transition ${
                item.path === file.path
                  ? 'border-[#C09B45] bg-[#C09B45]/15 text-[#C09B45]'
                  : 'border-white/10 text-white/45 hover:border-white/30 hover:text-white/80'
              }`}
            >
              {item.label}
            </button>
            <button
              onClick={() => download(item)}
              aria-label={`Скачать ${item.label}`}
              title={`Скачать ${item.label}`}
              className="rounded-full border border-white/10 p-1.5 text-white/35 transition hover:border-[#C09B45]/50 hover:text-[#C09B45]"
            >
              <Download className="h-3 w-3" />
            </button>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-[#0B0F16] px-3 py-2">
        <p className="flex min-w-0 items-center gap-2 font-mono text-[10px] text-[#C09B45]">
          <FileCode2 className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">{file.path}</span>
        </p>
        <div className="flex shrink-0 items-center gap-3">
          <p className="font-body text-[8px] uppercase tracking-[0.2em] text-white/30">
            {file.code.split('\n').length} строк
          </p>
          <button
            onClick={copyAll}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#C09B45]/50 bg-[#C09B45]/10 px-3 py-1.5 font-body text-[9px] uppercase tracking-[0.16em] text-[#C09B45] transition hover:bg-[#C09B45]/20"
          >
            {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
            {copied ? 'Скопировано' : 'Копировать весь код'}
          </button>
        </div>
      </div>

      <pre className="max-h-[62vh] overflow-auto rounded-xl border border-white/10 bg-[#05070B] p-3 text-left font-mono text-[10px] leading-relaxed text-[#C9D2DD] sm:text-[11px]">
        <code>{file.code}</code>
      </pre>
    </div>
  );
}