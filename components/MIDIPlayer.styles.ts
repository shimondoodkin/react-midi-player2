import React from 'react';

export const styles: Record<string, React.CSSProperties> = {
  player: {
    width: '100%',
    maxWidth: '600px',
    background: '#f1f3f4',
    borderRadius: '8px',
    padding: '12px 16px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },

  loading: {
    textAlign: 'center',
    padding: '20px',
    color: '#666',
  },

  controls: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },

  playButton: {
    width: '40px',
    height: '40px',
    border: 'none',
    borderRadius: '50%',
    background: '#2196F3',
    color: 'white',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background 0.2s',
    flexShrink: 0,
  },

  playButtonDisabled: {
    background: '#ccc',
    cursor: 'not-allowed',
  },

  timeDisplay: {
    fontSize: '13px',
    color: '#5f6368',
    fontVariantNumeric: 'tabular-nums',
    minWidth: '40px',
    textAlign: 'center',
    flexShrink: 0,
  },

  progressContainer: {
    flex: 1,
    position: 'relative',
    height: '6px',
    display: 'flex',
    alignItems: 'center',
  },

  progressBar: {
    width: '100%',
    height: '6px',
    WebkitAppearance: 'none',
    appearance: 'none',
    background: '#ddd',
    borderRadius: '3px',
    outline: 'none',
    cursor: 'pointer',
    transition: 'height 0.2s',
  },

  progressBarDisabled: {
    cursor: 'not-allowed',
    opacity: 0.5,
  },
};

export const injectGlobalStyles = () => {
  if (typeof document === 'undefined') return;
  
  const styleId = 'react-midi-player-styles';
  if (document.getElementById(styleId)) return;

  const styleElement = document.createElement('style');
  styleElement.id = styleId;
  styleElement.textContent = `
    .react-midi-player-progress:hover {
      height: 8px !important;
    }
    
    .react-midi-player-progress::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: #2196F3;
      cursor: pointer;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
      transition: transform 0.2s;
    }
    
    .react-midi-player-progress::-webkit-slider-thumb:hover {
      transform: scale(1.2);
    }
    
    .react-midi-player-progress::-moz-range-thumb {
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: #2196F3;
      cursor: pointer;
      border: none;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
      transition: transform 0.2s;
    }
    
    .react-midi-player-progress::-moz-range-thumb:hover {
      transform: scale(1.2);
    }
    
    .react-midi-player-button:hover:not(:disabled) {
      background: #1976D2 !important;
    }
  `;
  document.head.appendChild(styleElement);
};
