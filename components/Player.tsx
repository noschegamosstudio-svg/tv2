
import React, { useEffect, useState } from 'react';
import { Video } from '../types';

interface PlayerProps {
  video: Video;
  onBack: () => void;
}

const Player: React.FC<PlayerProps> = ({ video, onBack }) => {
  const [showControls, setShowControls] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowControls(false), 3000);
    return () => clearTimeout(timer);
  }, [showControls]);

  const toggleControls = () => setShowControls(true);

  return (
    <div 
      className="relative w-full h-full bg-black flex items-center justify-center overflow-hidden"
      onMouseMove={toggleControls}
    >
      {/* The main YouTube Iframe based on user request */}
      <iframe 
        width="100%" 
        height="100%" 
        src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1&showinfo=0`}
        title={video.title}
        frameBorder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        referrerPolicy="strict-origin-when-cross-origin" 
        allowFullScreen
        className="absolute inset-0 z-0"
      ></iframe>

      {/* Control Overlay */}
      <div className={`absolute inset-0 z-10 transition-opacity duration-500 flex flex-col justify-between p-10 bg-gradient-to-t from-black/80 via-transparent to-black/60 ${showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex items-center justify-between">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-white bg-neutral-800/80 hover:bg-red-600 px-6 py-3 rounded-xl transition-all tv-focus"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="font-bold">VOLTAR</span>
          </button>
          
          <div className="flex items-center gap-4 bg-black/40 px-4 py-2 rounded-full backdrop-blur-md border border-white/10">
            <span className="text-red-500 font-bold">• AO VIVO</span>
            <span className="text-white/60">1.2k assistindo</span>
          </div>
        </div>

        <div className="space-y-4 max-w-2xl">
          <div className="flex gap-2">
             <span className="bg-white text-black px-2 py-0.5 rounded text-xs font-black">4K</span>
             <span className="bg-red-600 text-white px-2 py-0.5 rounded text-xs font-black">HDR</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white">{video.title}</h1>
          <p className="text-lg text-neutral-300 line-clamp-2 max-w-xl font-medium leading-relaxed">
            {video.description}
          </p>
          
          <div className="flex gap-4 pt-4">
             <button className="bg-white text-black px-8 py-3 rounded-xl font-bold hover:scale-105 transition-transform tv-focus">PAUSAR</button>
             <button className="bg-neutral-800/80 text-white px-8 py-3 rounded-xl font-bold hover:scale-105 transition-transform tv-focus">MAIS DETALHES</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
