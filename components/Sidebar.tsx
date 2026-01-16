
import React from 'react';
import { ViewState } from '../types';

interface SidebarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView }) => {
  const menuItems = [
    { id: 'home', label: 'Início', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { id: 'search', label: 'Busca', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' },
    { id: 'settings', label: 'Ajustes', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
  ];

  return (
    <div className="w-24 md:w-64 h-full bg-neutral-900 flex flex-col items-center py-8 gap-10 border-r border-neutral-800 transition-all duration-300">
      <div className="text-red-600 font-bold text-2xl flex items-center gap-2">
        <span className="bg-red-600 text-white px-2 py-1 rounded text-sm">HD</span>
        <span className="hidden md:inline">STREAM</span>
      </div>
      
      <nav className="flex flex-col w-full gap-2 px-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id as ViewState)}
            className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 tv-focus group
              ${currentView === item.id ? 'bg-red-600 text-white shadow-lg shadow-red-900/30' : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'}
            `}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
            </svg>
            <span className="hidden md:inline font-semibold">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto px-4 w-full">
         <div className="bg-neutral-800 rounded-2xl p-4 hidden md:block">
            <p className="text-xs text-neutral-500 font-medium mb-1">USUÁRIO</p>
            <p className="text-sm font-bold text-white">Smart Guest</p>
         </div>
      </div>
    </div>
  );
};

export default Sidebar;
