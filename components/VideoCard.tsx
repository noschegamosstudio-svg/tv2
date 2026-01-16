
import React from 'react';
import { Video } from '../types';

interface VideoCardProps {
  video: Video;
  onClick: () => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="group cursor-pointer flex flex-col gap-3 p-2 rounded-2xl hover:bg-neutral-800/50 transition-all duration-300 tv-focus"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
    >
      <div className="relative aspect-video rounded-xl overflow-hidden bg-neutral-800">
        <img 
          src={video.thumbnail} 
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-0.5 rounded text-xs font-bold text-white">
          {video.duration}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
           <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4.516 2.104C4.157 1.9 3.75 2.16 3.75 2.571v14.858c0 .412.407.671.766.467l12.91-7.429a.539.539 0 000-.934l-12.91-7.429z" />
              </svg>
           </div>
        </div>
      </div>
      <div className="px-1">
        <h3 className="text-lg font-bold line-clamp-1 group-hover:text-red-500 transition-colors">
          {video.title}
        </h3>
        <p className="text-sm text-neutral-400 line-clamp-2 mt-1 leading-relaxed">
          {video.description}
        </p>
        <div className="flex items-center gap-2 mt-2">
           <span className="text-xs bg-neutral-800 px-2 py-1 rounded text-neutral-300">{video.category}</span>
           <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">4K HDR</span>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
