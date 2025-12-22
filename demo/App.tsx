import React, { useState } from 'react';
import MIDIPlayer from '../components/MIDIPlayer';
import type { MIDISong } from '../lib/midi/types';

function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleLoad = (song: MIDISong) => {
    console.log('MIDI file loaded:', song);
    console.log('Tracks:', song.tracks.length);
    console.log('Duration:', song.duration, 'seconds');
  };

  const handleTick = (song: MIDISong, position: number) => {
    // Update position display (called frequently)
  };

  const handleEnd = (song: MIDISong) => {
    console.log('Playback ended');
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎵 MIDI Player Demo</h1>
        <p>A React component for playing MIDI files in the browser</p>
      </header>

      <section className="info-section">
          <h2>github</h2>
          <a href="https://github.com/shimondoodkin/react-midi-player2">https://github.com/shimondoodkin/react-midi-player2</a>
      </section>

      <main className="app-main">
        <section className="demo-section">
          <h2>Try it out</h2>
          <p>Upload a MIDI file (.mid, .midi, .kar) to start playing:</p>

          <div style={{ marginBottom: '1rem' }}>
            <input
              type="file"
              accept=".mid,.midi,.kar"
              onChange={handleFileSelect}
              style={{
                padding: '8px 12px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            />
          </div>

          <MIDIPlayer
            file={selectedFile}
            autoPlay={false}
            autoReplay={false}
            debug={true}
            onLoad={handleLoad}
            onTick={handleTick}
            onEnd={handleEnd}
          />
        </section>

        <section className="info-section">
          <h2>Features</h2>
          <ul>
            <li>🎵 Play MIDI files from file upload or URL</li>
            <li>⏯️ Play, pause, and stop controls</li>
            <li>🎚️ Position seeking with progress slider</li>
            <li>🔁 Auto-replay option</li>
            <li>📊 Track information display</li>
            <li>🎹 Volume and instrument control per track</li>
            <li>⚛️ React hooks for easy integration</li>
            <li>📘 TypeScript support</li>
          </ul>
        </section>

        <section className="usage-section">
          <h2>Quick Start</h2>
          <pre><code>{`import { useState } from 'react';
import MIDIPlayer from './components/MIDIPlayer';

function MyApp() {
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
}`}</code></pre>
        </section>

        <section className="based-on">
          <p>
            Based on the excelent sounding project WebAudioFont https://github.com/surikov/webaudiofont by Sergey Surikov.
          </p>
          <p>
            based on initial development into a simple player from {' '}
            <a href="https://github.com/fraigo/javascript-midi-player" target="_blank" rel="noopener noreferrer">
              javascript-midi-player
            </a>
            {' '}by fraigo
          </p>
        </section>

      </main>

      <footer className="app-footer">

      </footer>
    </div>
  );
}

export default App;
