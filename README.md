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

## Project Structure

```
midi-player/
├── lib/
│   └── midi/
│       ├── MIDIPlayer.js          # Core MIDI player (from javascript-midi-player)
│       ├── MIDIFile.js            # MIDI file parser (from javascript-midi-player)
│       ├── WebAudioFontPlayer.js  # Web Audio Font player (from javascript-midi-player)
│       ├── types.ts               # TypeScript type definitions
│       ├── useMIDIPlayer.ts       # React hook for MIDI player
│       ├── index.ts               # Library exports
│       └── README.md              # Detailed library documentation
├── components/
│   ├── MIDIPlayer.tsx             # Main React component with UI
│   └── MIDIPlayerExample.tsx      # Example usage component
├── package.json                   # Package configuration
├── index.ts                       # Main entry point
├── README.md                      # This file
└── MIDI_PLAYER_INTEGRATION.md     # Integration guide
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

This is a standalone component library. To use it in your project:

1. Copy the entire `midi-player` directory to your project
2. Import the components as needed

## Usage

### Basic Usage

```tsx
import { MIDIPlayer } from './midi-player';

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
import { MIDIPlayer } from './midi-player';

<MIDIPlayer
  url="/path/to/song.mid"
  autoPlay={true}
  autoReplay={false}
/>
```

### With Event Handlers

```tsx
import { MIDIPlayer, type MIDISong } from './midi-player';

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
| `url` | `string` | `undefined` | URL to MIDI file to load automatically |
| `autoPlay` | `boolean` | `false` | Start playing automatically when loaded |
| `autoReplay` | `boolean` | `true` | Loop playback when song ends |
| `debug` | `boolean` | `false` | Enable debug console messages |
| `className` | `string` | `''` | Additional CSS class names |
| `onLoad` | `(song: MIDISong) => void` | `undefined` | Called when MIDI file is loaded |
| `onTick` | `(song: MIDISong, position: number) => void` | `undefined` | Called on each playback tick |
| `onEnd` | `(song: MIDISong) => void` | `undefined` | Called when playback ends |

### useMIDIPlayer Hook

See `lib/midi/README.md` for detailed API documentation.

## Browser Compatibility

This component uses the Web Audio API and requires a modern browser:
- Chrome 35+
- Firefox 25+
- Safari 14.1+
- Edge 79+

## Credits

Based on:
- [javascript-midi-player](https://github.com/fraigo/javascript-midi-player) by fraigo
- [WebAudioFont](https://github.com/surikov/webaudiofont) by Sergey Surikov

## License

The original javascript-midi-player library and WebAudioFont are used under their respective licenses.
