export function ApexOrb({ speaking }: { speaking: boolean }) {
  const orbAnimation = speaking
    ? "animate-[pulse_1.2s_ease-in-out_infinite]" // Faster pulse when speaking
    : "animate-[pulse_4s_ease-in-out_infinite]" // Slower "breathing" when idle

  return (
    <div
      className={`w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 via-purple-600 to-blue-700 shadow-inner flex items-center justify-center transition-all duration-500 ${orbAnimation}`}
    >
      <div className="text-4xl">🧠</div>
    </div>
  )
}
