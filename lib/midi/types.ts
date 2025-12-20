export interface MIDITrack {
  notes: MIDINote[];
  info: InstrumentInfo;
  id: number;
  program: number;
  volume: number;
}

export interface MIDINote {
  when: number;
  duration: number;
  pitch: number;
  slides?: any;
}

export interface MIDIBeat {
  notes: MIDINote[];
  info: InstrumentInfo;
  id: number;
  n: number;
  volume: number;
}

export interface InstrumentInfo {
  variable: string;
  url: string;
}

export interface MIDISong {
  tracks: MIDITrack[];
  beats: MIDIBeat[];
  duration: number;
}

export type PlayerState = "stopped" | "playing" | "paused";

export interface MIDIPlayerInstance {
  play(): void;
  pause(): void;
  stop(): void;
  getPosition(): number;
  setPosition(position: number): void;
  setVolume(volume: number, track: number): void;
  setInstrument(value: number, track: number): void;
  getCurrentSong(): MIDISong | null;
  getContext(): any;
  handleURL(url: string): void;
  handleBlob(blob: Blob): void;
  
  currentPosition: number;
  duration: number;
  state: PlayerState;
  autoReplay: boolean;
  debug: boolean;
  
  onload: ((song: MIDISong) => void) | null;
  ontick: ((song: MIDISong, position: number) => void) | null;
  onend: ((song: MIDISong) => void) | null;
}

declare global {
  interface Window {
    MIDIPlayer: new (source?: string | HTMLInputElement | Blob, onload?: (song: MIDISong) => void) => MIDIPlayerInstance;
  }
}
