import { useEffect, useRef, useState, useCallback } from 'react';
import type { MIDIPlayerInstance, MIDISong, PlayerState } from './types';

export interface UseMIDIPlayerOptions {
  autoReplay?: boolean;
  debug?: boolean;
  onLoad?: (song: MIDISong) => void;
  onTick?: (song: MIDISong, position: number) => void;
  onEnd?: (song: MIDISong) => void;
}

export interface UseMIDIPlayerReturn {
  player: MIDIPlayerInstance | null;
  isReady: boolean;
  isPlaying: boolean;
  isPaused: boolean;
  isStopped: boolean;
  currentPosition: number;
  duration: number;
  currentSong: MIDISong | null;
  play: () => void;
  pause: () => void;
  stop: () => void;
  loadURL: (url: string) => void;
  loadFile: (file: File) => void;
  setPosition: (position: number) => void;
  setVolume: (volume: number, track: number) => void;
  setInstrument: (value: number, track: number) => void;
}

export function useMIDIPlayer(options: UseMIDIPlayerOptions = {}): UseMIDIPlayerReturn {
  const playerRef = useRef<MIDIPlayerInstance | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [state, setState] = useState<PlayerState>('stopped');
  const [currentPosition, setCurrentPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentSong, setCurrentSong] = useState<MIDISong | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    // Wait for MIDIPlayer to be available
    const initPlayer = () => {
      if (!window.MIDIPlayer) {
        setTimeout(initPlayer, 100);
        return;
      }

      const player = new window.MIDIPlayer();
      
      player.autoReplay = options.autoReplay ?? true;
      player.debug = options.debug ?? false;

      player.onload = (song: MIDISong) => {
        setCurrentSong(song);
        setDuration(song.duration);
        setIsReady(true);
        options.onLoad?.(song);
      };

      player.ontick = (song: MIDISong, position: number) => {
        setCurrentPosition(position);
        setState(player.state);
        options.onTick?.(song, position);
      };

      player.onend = (song: MIDISong) => {
        setState('stopped');
        options.onEnd?.(song);
      };

      playerRef.current = player;
    };

    initPlayer();

    return () => {
      if (playerRef.current) {
        playerRef.current.stop();
      }
    };
  }, []);

  const play = useCallback(() => {
    playerRef.current?.play();
    setState('playing');
  }, []);

  const pause = useCallback(() => {
    playerRef.current?.pause();
    setState('paused');
  }, []);

  const stop = useCallback(() => {
    playerRef.current?.stop();
    setState('stopped');
    setCurrentPosition(0);
  }, []);

  const loadURL = useCallback((url: string) => {
    setIsReady(false);
    playerRef.current?.handleURL(url);
  }, []);

  const loadFile = useCallback((file: File) => {
    setIsReady(false);
    playerRef.current?.handleBlob(file);
  }, []);

  const setPosition = useCallback((position: number) => {
    playerRef.current?.setPosition(position);
    setCurrentPosition(position);
  }, []);

  const setVolume = useCallback((volume: number, track: number) => {
    playerRef.current?.setVolume(volume, track);
  }, []);

  const setInstrument = useCallback((value: number, track: number) => {
    playerRef.current?.setInstrument(value, track);
  }, []);

  return {
    player: playerRef.current,
    isReady,
    isPlaying: state === 'playing',
    isPaused: state === 'paused',
    isStopped: state === 'stopped',
    currentPosition,
    duration,
    currentSong,
    play,
    pause,
    stop,
    loadURL,
    loadFile,
    setPosition,
    setVolume,
    setInstrument,
  };
}
