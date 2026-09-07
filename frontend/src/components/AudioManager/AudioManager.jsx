import React, { useState, useEffect, useRef } from 'react';
import catOnARug from '../../assets/audio/cat_on_a_rug.mp3';
import cozyKitty from '../../assets/audio/cozy_kitty.mp3';
import './AudioManager.css';

export default function AudioManager({ onMusicStart, onMusicStop }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const audioRef = useRef(null);
  
  const tracks = [catOnARug, cozyKitty];

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Erro ao tocar áudio:", e));
        if (onMusicStart) onMusicStart();
      } else {
        audioRef.current.pause();
        if (onMusicStop) onMusicStop();
      }
    }
  }, [isPlaying, currentTrack, onMusicStart, onMusicStop]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length);
  };

  const handleEnded = () => {
    nextTrack();
  };

  return (
    <>
      <audio 
        ref={audioRef} 
        src={tracks[currentTrack]} 
        onEnded={handleEnded}
        volume="0.3"
      />
      <button className="toy-btn" onClick={togglePlay} title="Ligar/Desligar Música">
        <span style={{fontSize: '18px'}}>{isPlaying ? '🔊' : '🔇'}</span>
      </button>
      {isPlaying && (
        <button className="toy-btn" onClick={nextTrack} title="Próxima Música">
          <span style={{fontSize: '18px'}}>⏭️</span>
        </button>
      )}
    </>
  );
}
