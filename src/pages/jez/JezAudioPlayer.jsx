import { useEffect, useRef, useState } from 'react';
import { formatDuration } from '../../utils/duration';

const SPEEDS = [0.75, 1, 1.25, 1.5];
const SKIP_SECONDS = 15;

// Кастомний аудіоплеєр для сторінки статті JEZ: play/pause, перетягуваний
// прогрес-бар, перемотка ±15с, перемикач швидкості. Керує прихованим
// <audio>, весь UI — власна розмітка (не нативні контроли браузера).
export default function JezAudioPlayer({ src, fallbackDurationSeconds = 0 }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(fallbackDurationSeconds);
  const [rate, setRate] = useState(1);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return undefined;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => {
      if (Number.isFinite(audio.duration)) setDuration(audio.duration);
    };
    const onEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('ended', onEnded);
    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('ended', onEnded);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const skip = (delta) => {
    const audio = audioRef.current;
    if (!audio) return;
    const next = Math.min(Math.max(audio.currentTime + delta, 0), duration || audio.duration || 0);
    audio.currentTime = next;
    setCurrentTime(next);
  };

  const onSeek = (event) => {
    const audio = audioRef.current;
    const value = Number(event.target.value);
    if (audio) audio.currentTime = value;
    setCurrentTime(value);
  };

  const changeRate = (speed) => {
    const audio = audioRef.current;
    setRate(speed);
    if (audio) audio.playbackRate = speed;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="jez-player">
      <audio ref={audioRef} src={src} preload="metadata" />

      <div className="jez-player__top">
        <button
          type="button"
          className="jez-player__skip"
          onClick={() => skip(-SKIP_SECONDS)}
          aria-label={`Назад на ${SKIP_SECONDS} секунд`}
        >
          «{SKIP_SECONDS}
        </button>

        <button
          type="button"
          className="jez-player__play"
          onClick={togglePlay}
          aria-label={isPlaying ? 'Пауза' : 'Відтворити'}
        >
          {isPlaying ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="5" width="4" height="14" rx="1" />
              <rect x="14" y="5" width="4" height="14" rx="1" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        <button
          type="button"
          className="jez-player__skip"
          onClick={() => skip(SKIP_SECONDS)}
          aria-label={`Вперед на ${SKIP_SECONDS} секунд`}
        >
          {SKIP_SECONDS}»
        </button>

        <div className="jez-player__progress-wrap">
          <span className="jez-player__time">{formatDuration(currentTime)}</span>
          <input
            type="range"
            className="jez-player__progress"
            min={0}
            max={duration || 0}
            step={0.1}
            value={currentTime}
            onChange={onSeek}
            style={{ '--jez-progress': `${progressPercent}%` }}
            aria-label="Позиція відтворення"
          />
          <span className="jez-player__time jez-player__time--end">{formatDuration(duration)}</span>
        </div>
      </div>

      <div className="jez-player__bottom">
        <div className="jez-player__speeds">
          {SPEEDS.map((speed) => (
            <button
              key={speed}
              type="button"
              className={`jez-player__speed${rate === speed ? ' is-active' : ''}`}
              onClick={() => changeRate(speed)}
            >
              {speed}x
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
