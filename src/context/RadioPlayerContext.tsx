import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

const STREAM_URL = "https://coderadio-admin-v2.freecodecamp.org/listen/coderadio/radio.mp3";

type RadioPlayerContextValue = {
  isPlaying: boolean;
  isLoading: boolean;
  hasAutoplayFailed: boolean;
  togglePlayback: () => Promise<void>;
};

const RadioPlayerContext = createContext<RadioPlayerContextValue | null>(null);

export function RadioPlayerProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasAutoplayFailed, setHasAutoplayFailed] = useState(false);

  useEffect(() => {
    const audio = new Audio(STREAM_URL);
    audioRef.current = audio;
    audio.preload = "none";

    const handleLoadStart = () => setIsLoading(true);
    const handleWaiting = () => setIsLoading(true);
    const handleCanPlay = () => setIsLoading(false);
    const handlePlaying = () => {
      setIsLoading(false);
      setIsPlaying(true);
      setHasAutoplayFailed(false);
    };
    const handlePause = () => {
      setIsLoading(false);
      setIsPlaying(false);
    };
    const handleError = () => setIsLoading(false);

    audio.addEventListener("loadstart", handleLoadStart);
    audio.addEventListener("waiting", handleWaiting);
    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("playing", handlePlaying);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("error", handleError);

    const tryAutoplay = async () => {
      setIsLoading(true);
      try {
        await audio.play();
      } catch {
        setIsLoading(false);
        setIsPlaying(false);
        setHasAutoplayFailed(true);
      }
    };

    void tryAutoplay();

    return () => {
      audio.removeEventListener("loadstart", handleLoadStart);
      audio.removeEventListener("waiting", handleWaiting);
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("playing", handlePlaying);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("error", handleError);
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
      audioRef.current = null;
    };
  }, []);

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audio.paused) {
      audio.pause();
      return;
    }

    setIsLoading(true);
    try {
      await audio.play();
      setHasAutoplayFailed(false);
    } catch {
      setIsLoading(false);
      setHasAutoplayFailed(true);
    }
  };

  const value = useMemo(
    () => ({
      isPlaying,
      isLoading,
      hasAutoplayFailed,
      togglePlayback,
    }),
    [isPlaying, isLoading, hasAutoplayFailed],
  );

  return <RadioPlayerContext.Provider value={value}>{children}</RadioPlayerContext.Provider>;
}

export function useRadioPlayer() {
  const context = useContext(RadioPlayerContext);
  if (!context) {
    throw new Error("useRadioPlayer must be used within RadioPlayerProvider");
  }
  return context;
}
