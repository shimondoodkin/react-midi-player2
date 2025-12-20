import React, { useEffect, useRef, useState } from 'react';
import { useMIDIPlayer } from '../lib/midi/useMIDIPlayer';
import type { MIDISong } from '../lib/midi/types';
import styles from './MIDIPlayer.module.css';

export interface MIDIPlayerProps {
  file?: File | null;
  url?: string;
  autoPlay?: boolean;
  autoReplay?: boolean;
  debug?: boolean;
  className?: string;
  onLoad?: (song: MIDISong) => void;
  onTick?: (song: MIDISong, position: number) => void;
  onEnd?: (song: MIDISong) => void;
}

export function MIDIPlayer({
  file,
  url,
  autoPlay = false,
  autoReplay = false,
  debug = false,
  className = '',
  onLoad,
  onTick,
  onEnd,
}: MIDIPlayerProps) {
  const [scriptsLoaded, setScriptsLoaded] = useState(false);
  const [fileName, setFileName] = useState<string>('');

  const {
    isReady,
    isPlaying,
    currentPosition,
    duration,
    currentSong,
    play,
    pause,
    stop,
    loadURL,
    loadFile,
    setPosition,
  } = useMIDIPlayer({
    autoReplay,
    debug,
    onLoad,
    onTick,
    onEnd,
  });

  useEffect(() => {
    const loadScripts = async () => {
      if (typeof window === 'undefined') return;

      const scripts = [
        new URL('../lib/midi/WebAudioFontPlayer.js', import.meta.url).href,
        new URL('../lib/midi/MIDIFile.js', import.meta.url).href,
        new URL('../lib/midi/MIDIPlayer.js', import.meta.url).href,
      ];

      for (const src of scripts) {
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement('script');
          script.src = src;
          script.async = false;
          script.onload = () => resolve();
          script.onerror = () => reject(new Error(`Failed to load ${src}`));
          document.head.appendChild(script);
        });
      }

      setScriptsLoaded(true);
    };

    loadScripts().catch(console.error);
  }, []);

  useEffect(() => {
    if (scriptsLoaded && url) {
      loadURL(url);
    }
  }, [scriptsLoaded, url, loadURL]);

  useEffect(() => {
    if (scriptsLoaded && file) {
      stop(); // Reset playback state before loading new file
      setFileName(file.name);
      loadFile(file);
    }
  }, [scriptsLoaded, file, loadFile, stop]);

  useEffect(() => {
    if (isReady && autoPlay) {
      play();
    }
  }, [isReady, autoPlay, play]);

  const handlePositionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const position = parseFloat(event.target.value);
    setPosition(position);
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercent = duration > 0 ? (currentPosition / duration) * 100 : 0;

  if (!scriptsLoaded) {
    return (
      <div className={`${styles.player} ${className}`}>
        <div className={styles.loading}>Loading MIDI Player...</div>
      </div>
    );
  }

  return (
    <div className={`${styles.player} ${className}`}>
      <div className={styles.controls}>
        <button
          type="button"
          onClick={handlePlayPause}
          disabled={!isReady}
          className={styles.playButton}
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path fill="currentColor" d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path fill="currentColor" d="M8 5v14l11-7z"/>
            </svg>
          )}
        </button>

        <div className={styles.timeDisplay}>
          {formatTime(currentPosition)}
        </div>

        <div className={styles.progressContainer}>
          <input
            type="range"
            min="0"
            max={duration || 100}
            step="0.1"
            value={currentPosition}
            onChange={handlePositionChange}
            disabled={!isReady}
            className={styles.progressBar}
            style={{
              background: `linear-gradient(to right, #2196F3 0%, #2196F3 ${progressPercent}%, #ddd ${progressPercent}%, #ddd 100%)`
            }}
          />
        </div>

        <div className={styles.timeDisplay}>
          {formatTime(duration)}
        </div>
      </div>
    </div>
  );
}

export default MIDIPlayer;
