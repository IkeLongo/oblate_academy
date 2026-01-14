export default function LoadingSaint() {
  return (
    <div className="base bg-gradient-to-b from-yellow-200 via-gray-100 to-yellow-200 mx-auto px-6 py-20 md:pt-10">
      <div className="max-w-6xl mx-auto pt-16 md:pt-0">
        <div className="h-6 w-32 rounded bg-white/50 animate-pulse" />
      </div>

      <div className="mt-8 h-10 w-2/3 mx-auto rounded bg-white/50 animate-pulse" />

      {/* Overview skeleton */}
      <div className="mt-10 bg-white/70 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row gap-8 items-start max-w-lg md:max-w-5xl mx-auto">
        <div className="w-full md:w-[320px]">
          <div className="h-[450px] rounded-2xl bg-white/60 animate-pulse" />
          <div className="mt-6 h-12 rounded-lg bg-white/60 animate-pulse" />
        </div>

        <div className="flex-1 space-y-4 w-full">
          <div className="h-6 w-full rounded bg-white/60 animate-pulse" />
          <div className="h-6 w-11/12 rounded bg-white/60 animate-pulse" />
          <div className="h-6 w-10/12 rounded bg-white/60 animate-pulse" />
          <div className="h-6 w-9/12 rounded bg-white/60 animate-pulse" />
        </div>
      </div>

      {/* Action cards skeleton */}
      <div className="mt-12 flex justify-between md:justify-center gap-8 max-w-lg md:max-w-none flex-wrap mx-auto">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-full md:w-[200px] rounded-2xl overflow-hidden bg-white/60 animate-pulse"
          >
            <div className="h-44 md:h-32" />
            <div className="h-12" />
          </div>
        ))}
      </div>
    </div>
  );
}
