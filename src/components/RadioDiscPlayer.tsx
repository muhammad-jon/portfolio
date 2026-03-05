import { Pause, Play } from "lucide-react";
import { useRadioPlayer } from "../context/RadioPlayerContext";

export function RadioDiscPlayer() {
  const { isPlaying, isLoading, hasAutoplayFailed, togglePlayback } = useRadioPlayer();

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative flex size-40 items-center justify-center rounded-full border border-line bg-gradient-to-br from-slate-900/95 via-slate-800/90 to-slate-700/80 shadow-soft">
        <div
          className={`relative size-[7.9rem] rounded-full border border-white/15 shadow-[inset_0_2px_16px_rgba(255,255,255,0.06)] ${
            isPlaying ? "animate-spin-slow" : ""
          }`}
          style={{
            backgroundImage:
              "radial-gradient(circle at 28% 26%, rgba(255,255,255,0.22), transparent 19%), repeating-radial-gradient(circle at center, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 1px, transparent 2px, transparent 4px), linear-gradient(145deg, #0f172a 5%, #020617 55%, #0b1220 100%)",
          }}
          aria-hidden="true"
        >
          <div className="absolute inset-0 rounded-full bg-[repeating-conic-gradient(from_14deg,rgba(255,255,255,0.07)_0deg,rgba(255,255,255,0.02)_9deg,transparent_14deg,transparent_24deg)] opacity-65" />
          <div className="absolute left-6 top-5 h-7 w-7 rounded-full bg-white/15 blur-xl" />
          <div className="absolute inset-1/2 size-7 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-zinc-900 shadow-[inset_0_0_8px_rgba(255,255,255,0.2)]" />
          <div className="absolute inset-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/75" />
        </div>
      </div>

      <button
        type="button"
        onClick={() => {
          void togglePlayback();
        }}
        className="focus-ring inline-flex items-center gap-2 rounded-full border border-line/80 bg-surface/70 px-4 py-2 text-sm text-text shadow-soft backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:border-accent/50"
      >
        {isPlaying ? <Pause size={15} /> : <Play size={15} />}
        {isPlaying ? "Pause" : "Play"}
      </button>

      <p className="text-xs text-muted">
        Now playing: <a href="https://coderadio.freecodecamp.org/">CodeRadio</a>
      </p>

      {isLoading ? (
        <p className="inline-flex items-center gap-2 text-xs text-muted">
          <span className="h-3 w-3 animate-spin rounded-full border border-muted/40 border-t-accent" />
          Buffering...
        </p>
      ) : null}

      {hasAutoplayFailed ? (
        <p className="text-xs text-muted">Click Play to start audio</p>
      ) : null}
    </div>
  );
}
