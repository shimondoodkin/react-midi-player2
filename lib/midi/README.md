# MIDI Player Component

A React MIDI player component based on [javascript-midi-player](https://github.com/fraigo/javascript-midi-player) by fraigo, which uses WebAudioFont for MIDI playback in the browser.

## Features

- 🎵 Play MIDI files from URL or file upload
- ⏯️ Play, pause, and stop controls
- 🎚️ Position seeking with progress slider
- 🔁 Auto-replay option
- 📊 Track information display
- 🎹 Volume and instrument control per track
- ⚛️ React hooks for easy integration
- 📘 TypeScript support

## Installation

The required JavaScript libraries are already included in `lib/midi/`:
- `WebAudioFontPlayer.js` - Web Audio Font player
- `MIDIFile.js` - MIDI file parser
- `MIDIPlayer.js` - MIDI player controller

## Usage

### Basic Usage

```tsx
import MIDIPlayer from '@/components/MIDIPlayer';

function MyComponent() {
  return (
    <MIDIPlayer
      autoPlay={false}
      autoReplay={true}
    />
  );
}
```

### Load from URL

```tsx
<MIDIPlayer
  url="/path/to/song.mid"
  autoPlay={true}
  autoReplay={false}
/>
```

### With Event Handlers

```tsx
import MIDIPlayer from '@/components/MIDIPlayer';
import type { MIDISong } from '@/lib/midi/types';

function MyComponent() {
  const handleLoad = (song: MIDISong) => {
    console.log('Loaded:', song);
  };

  const handleTick = (song: MIDISong, position: number) => {
    console.log('Position:', position);
  };

  const handleEnd = (song: MIDISong) => {
    console.log('Ended');
  };

  return (
    <MIDIPlayer
      onLoad={handleLoad}
      onTick={handleTick}
      onEnd={handleEnd}
    />
  );
}
```

### Using the Hook Directly

```tsx
import { useMIDIPlayer } from '@/lib/midi/useMIDIPlayer';

function CustomPlayer() {
  const {
    isReady,
    isPlaying,
    currentPosition,
    duration,
    play,
    pause,
    stop,
    loadURL,
    loadFile,
  } = useMIDIPlayer({
    autoReplay: true,
    debug: false,
  });

  return (
    <div>
      <button onClick={play} disabled={!isReady}>Play</button>
      <button onClick={pause} disabled={!isPlaying}>Pause</button>
      <button onClick={stop}>Stop</button>
      <p>{currentPosition} / {duration}</p>
    </div>
  );
}
```

## Props

### MIDIPlayer Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `url` | `string` | `undefined` | URL to MIDI file to load automatically |
| `autoPlay` | `boolean` | `false` | Start playing automatically when loaded |
| `autoReplay` | `boolean` | `true` | Loop playback when song ends |
| `debug` | `boolean` | `false` | Enable debug console messages |
| `className` | `string` | `''` | Additional CSS class names |
| `onLoad` | `(song: MIDISong) => void` | `undefined` | Called when MIDI file is loaded |
| `onTick` | `(song: MIDISong, position: number) => void` | `undefined` | Called on each playback tick |
| `onEnd` | `(song: MIDISong) => void` | `undefined` | Called when playback ends |

### useMIDIPlayer Hook Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `autoReplay` | `boolean` | `true` | Loop playback when song ends |
| `debug` | `boolean` | `false` | Enable debug console messages |
| `onLoad` | `(song: MIDISong) => void` | `undefined` | Called when MIDI file is loaded |
| `onTick` | `(song: MIDISong, position: number) => void` | `undefined` | Called on each playback tick |
| `onEnd` | `(song: MIDISong) => void` | `undefined` | Called when playback ends |

### useMIDIPlayer Hook Return Values

| Property | Type | Description |
|----------|------|-------------|
| `player` | `MIDIPlayerInstance \| null` | The MIDI player instance |
| `isReady` | `boolean` | Whether a MIDI file is loaded and ready |
| `isPlaying` | `boolean` | Whether playback is active |
| `isPaused` | `boolean` | Whether playback is paused |
| `isStopped` | `boolean` | Whether playback is stopped |
| `currentPosition` | `number` | Current playback position in seconds |
| `duration` | `number` | Total duration in seconds |
| `currentSong` | `MIDISong \| null` | Currently loaded song data |
| `play()` | `() => void` | Start/resume playback |
| `pause()` | `() => void` | Pause playback |
| `stop()` | `() => void` | Stop playback and reset position |
| `loadURL(url)` | `(url: string) => void` | Load MIDI file from URL |
| `loadFile(file)` | `(file: File) => void` | Load MIDI file from File object |
| `setPosition(pos)` | `(position: number) => void` | Set playback position in seconds |
| `setVolume(vol, track)` | `(volume: number, track: number) => void` | Set volume (0-100) for specific track |
| `setInstrument(val, track)` | `(value: number, track: number) => void` | Set instrument for specific track |

## TypeScript Types

```typescript
interface MIDISong {
  tracks: MIDITrack[];
  beats: MIDIBeat[];
  duration: number;
}

interface MIDITrack {
  notes: MIDINote[];
  info: InstrumentInfo;
  id: number;
  program: number;
  volume: number;
}

interface MIDINote {
  when: number;
  duration: number;
  pitch: number;
  slides?: any;
}

type PlayerState = "stopped" | "playing" | "paused";
```

## Browser Compatibility

This component uses the Web Audio API and requires a modern browser:
- Chrome 35+
- Firefox 25+
- Safari 14.1+
- Edge 79+

## Credits

Based on [javascript-midi-player](https://github.com/fraigo/javascript-midi-player) by fraigo, which uses [WebAudioFont](https://github.com/surikov/webaudiofont) by Sergey Surikov.

## License

The original javascript-midi-player library and WebAudioFont are used under their respective licenses.
