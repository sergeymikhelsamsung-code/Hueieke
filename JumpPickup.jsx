export default function JumpPickup({ pickup, top }) {
  return (
    <div className="absolute z-10" style={{ left: pickup.x, top }}>
      <div className="absolute -left-4 -top-4 h-8 w-8 rounded-full bg-[#C09B45]/25 blur-md" />
      <div className="relative h-6 w-[15px] -translate-x-1/2 -translate-y-1/2 rounded-[3px] border border-[#F5E2A8]/70 bg-gradient-to-b from-[#F0D78A] via-[#C09B45] to-[#8A6C28] shadow-[0_0_12px_rgba(192,155,69,0.8)]">
        <div className="absolute inset-x-[1px] top-0 h-[2px] rounded-t-[2px] bg-[#E9E2CE]" />
        <div className="absolute inset-x-[2px] top-[7px] h-[7px] rounded-[1px] bg-[#0E4A24]" />
      </div>
    </div>
  );
}