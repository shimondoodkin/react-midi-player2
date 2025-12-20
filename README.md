# React MIDI Player

A React MIDI player component with HTML5 audio player styling. Built on top of [WebAudioFont](https://github.com/surikov/webaudiofont) by Sergey Surikov and inspired by [javascript-midi-player](https://github.com/fraigo/javascript-midi-player) by fraigo.

## 🎵 [Live Demo](https://shimondoodkin.github.io/react-midi-player)

## Features

- 🎵 Play MIDI files from URL or external file selection
- ⏯️ Clean HTML5 audio player interface
- 🎚️ Position seeking with progress slider
- 🔁 Auto-replay option
- 📊 Real-time playback position tracking
- 🎹 Full MIDI track support with WebAudioFont
- ⚛️ React hooks for easy integration
- 📘 TypeScript support
- 🎨 Customizable styling with CSS modules
- 🔄 Background playback support (continues when tab is inactive)

## Project Structure

```
react-midi-player/
├── lib/
│   └── midi/
│       ├── MIDIPlayer.js          # Core MIDI player with background playback support
│       ├── MIDIFile.js            # MIDI file parser
│       ├── WebAudioFontPlayer.js  # Web Audio Font player
│       ├── types.ts               # TypeScript type definitions
│       ├── useMIDIPlayer.ts       # React hook for MIDI player
│       └── index.ts               # Library exports
├── components/
│   ├── MIDIPlayer.tsx             # Main React component (HTML5 player style)
│   └── MIDIPlayer.module.css      # Component styles
├── demo/
│   ├── App.tsx                    # Demo application
│   ├── main.tsx                   # Demo entry point
│   └── index.css                  # Demo styles
├── package.json                   # Package configuration
├── index.ts                       # Main entry point
└── README.md                      # This file
```

## Quick Start - Run the Demo

To run the MIDI player demo locally:

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

The demo will open automatically at `http://localhost:3000`. You can upload MIDI files and test all the player features.

## Installation

```bash
npm install react-midi-player
```

Or install from GitHub:

```bash
npm install shimondoodkin/react-midi-player
```

## Usage

### Basic Usage with File Selection

The component accepts a file externally (similar to HTML5 audio element):

```tsx
import { useState } from 'react';
import { MIDIPlayer } from 'react-midi-player;

function MyComponent() {
  const [file, setFile] = useState<File | null>(null);

  return (
    <>
      <input
        type="file"
        accept=".mid,.midi,.kar"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <MIDIPlayer
        file={file}
        autoPlay={false}
        autoReplay={false}
      />
    </>
  );
}
```

### Load from URL

```tsx
import { MIDIPlayer } from 'react-midi-player2';

<MIDIPlayer
  url="/path/to/song.mid"
  autoPlay={true}
  autoReplay={false}
/>
```

### With Event Handlers

```tsx
import { MIDIPlayer, type MIDISong } from 'react-midi-player2';

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
import { useMIDIPlayer } from './midi-player';

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

## API Reference

### MIDIPlayer Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `file` | `File \| null` | `undefined` | MIDI file to load (externally selected) |
| `url` | `string` | `undefined` | URL to MIDI file to load automatically |
| `autoPlay` | `boolean` | `false` | Start playing automatically when loaded |
| `autoReplay` | `boolean` | `false` | Loop playback when song ends |
| `debug` | `boolean` | `false` | Enable debug console messages |
| `className` | `string` | `''` | Additional CSS class names |
| `onLoad` | `(song: MIDISong) => void` | `undefined` | Called when MIDI file is loaded |
| `onTick` | `(song: MIDISong, position: number) => void` | `undefined` | Called on each playback tick |
| `onEnd` | `(song: MIDISong) => void` | `undefined` | Called when playback ends |

### useMIDIPlayer Hook

The `useMIDIPlayer` hook provides low-level control over MIDI playback:

```tsx
const {
  player,           // MIDIPlayer instance
  isReady,          // Ready to play
  isPlaying,        // Currently playing
  isPaused,         // Paused state
  isStopped,        // Stopped state
  currentPosition,  // Current position in seconds
  duration,         // Total duration in seconds
  currentSong,      // Loaded song data
  play,             // Start playback
  pause,            // Pause playback
  stop,             // Stop playback
  loadURL,          // Load from URL
  loadFile,         // Load from File
  setPosition,      // Seek to position
  setVolume,        // Set track volume
  setInstrument,    // Change track instrument
} = useMIDIPlayer(options);
```

## Browser Compatibility

This component uses the Web Audio API and requires a modern browser:
- Chrome 35+
- Firefox 25+
- Safari 14.1+
- Edge 79+

## Credits

This project is built on top of excellent open-source work:

- **[WebAudioFont](https://github.com/surikov/webaudiofont)** by Sergey Surikov - Provides the excellent sounding MIDI synthesis using Web Audio API
- **[javascript-midi-player](https://github.com/fraigo/javascript-midi-player)** by fraigo - Initial development of the simple player interface

## License

MIT License - See LICENSE file for details.

The underlying libraries (WebAudioFont and javascript-midi-player) are used under their respective licenses.
