const SURFACES = {
  desk: 'from-[#C88A4A] via-[#9A6534] to-[#744A24] border-[#3A2616] shadow-[0_3px_0_0_#52351B]',
  beer: 'from-[#F0D78A] via-[#C09B45] to-[#8A6C28] border-[#5A4415] shadow-[0_3px_0_0_#4A3A10]',
  cheat: 'from-[#F6F1E4] via-[#DED5C0] to-[#B9AE93] border-dashed border-[#B91C1C]/60 shadow-[0_3px_0_0_#8C8371]',
};

export default function JumpPlatform({ platform, top }) {
  const surface = SURFACES[platform.type] || SURFACES.desk;

  return (
    <div className="absolute z-10" style={{ left: platform.x, top, width: platform.w, height: 26 }}>
      {/* ножки парты */}
      <div className="absolute bottom-0 left-[7px] h-[11px] w-[4px] rounded-sm bg-[#3A2616]" />
      <div className="absolute bottom-0 right-[7px] h-[11px] w-[4px] rounded-sm bg-[#3A2616]" />
      {/* тумба */}
      <div className="absolute left-[5px] right-[5px] top-[11px] h-[5px] rounded-[2px] bg-[#4A2F17]" />
      {/* столешница */}
      <div className={`absolute inset-x-0 top-0 h-[9px] rounded-[3px] border bg-gradient-to-b ${surface}`} />
      <div className="absolute inset-x-1 top-[1px] h-[2px] rounded-full bg-white/30" />

      {platform.type === 'beer' && (
        <div className="absolute -top-[17px] left-1/2 -translate-x-1/2 text-[16px] leading-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
          🍺
        </div>
      )}
    </div>
  );
}