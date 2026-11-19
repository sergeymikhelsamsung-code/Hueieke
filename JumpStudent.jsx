export default function JumpStudent({ student, top }) {
  return (
    <div
      className="absolute z-10"
      style={{ left: student.x, top, transform: 'translate(-50%, -100%)' }}
    >
      <div className="relative h-[34px] w-[30px]">
        {/* рюкзак */}
        <div className="absolute left-0 top-[13px] h-[13px] w-[7px] rounded-[2px] bg-[#7C2D12]" />
        {/* голова */}
        <div className="absolute left-1/2 top-0 h-[13px] w-[13px] -translate-x-1/2 rounded-full border border-black/40 bg-[#E8C9A0]" />
        {/* волосы */}
        <div className="absolute left-1/2 top-0 h-[5px] w-[13px] -translate-x-1/2 rounded-t-full bg-[#2F2118]" />
        {/* корпус */}
        <div className="absolute left-1/2 top-[12px] h-[15px] w-[19px] -translate-x-1/2 rounded-[3px] bg-[#1E3A5F]" />
        {/* телефон в руке */}
        <div className="absolute right-[1px] top-[18px] h-[7px] w-[5px] rotate-12 rounded-[1px] bg-[#86EFAC] shadow-[0_0_8px_2px_rgba(134,239,172,0.45)]" />
        {/* ноги */}
        <div className="absolute left-1/2 top-[25px] flex -translate-x-1/2 gap-[4px]">
          <span className="h-[9px] w-[5px] rounded-sm bg-[#111827]" />
          <span className="h-[9px] w-[5px] rounded-sm bg-[#111827]" />
        </div>
      </div>
    </div>
  );
}