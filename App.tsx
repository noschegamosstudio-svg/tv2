
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import VideoCard from './components/VideoCard';
import Player from './components/Player';
import { Video, ViewState } from './types';
import { getSmartRecommendations } from './services/geminiService';

const MOCK_VIDEOS: Video[] = [
  {
    id: '-gc3ASNGYTI',
    title: 'A Natureza em 8K HDR - Natureza Relaxante',
    description: 'Experimente a beleza da natureza em resolução ultra alta. Capturas cinematográficas de florestas, rios e montanhas.',
    thumbnail: 'https://picsum.photos/seed/nature1/800/450',
    duration: '15:30',
    category: 'Documentário'
  },
  {
    id: 'dQw4w9WgXcQ',
    title: 'O Futuro da Inteligência Artificial',
    description: 'Como a IA está mudando o mundo e o que esperar da próxima década na tecnologia.',
    thumbnail: 'https://picsum.photos/seed/tech/800/450',
    duration: '10:15',
    category: 'Tecnologia'
  },
  {
    id: 'lq596q2mFm0',
    title: 'Cidades do Amanhã: Urbanismo Sustentável',
    description: 'Explorando projetos arquitetônicos que visam a sustentabilidade e harmonia com o meio ambiente.',
    thumbnail: 'https://picsum.photos/seed/city/800/450',
    duration: '22:45',
    category: 'Educação'
  },
  {
    id: 'v_z4S_vUoXk',
    title: 'Gastronomia Molecular: O Guia Definitivo',
    description: 'A ciência por trás dos pratos mais inovadores do mundo. Técnicas e segredos revelados.',
    thumbnail: 'https://picsum.photos/seed/food/800/450',
    duration: '18:12',
    category: 'Culinária'
  },
  {
    id: 'mUvG_cQ_9_w',
    title: 'Expedição Ártico: O Degelo',
    description: 'Uma jornada emocionante pelas calotas polares para documentar o impacto das mudanças climáticas.',
    thumbnail: 'https://picsum.photos/seed/arctic/800/450',
    duration: '45:00',
    category: 'Natureza'
  },
  {
    id: '7v_A7G7v9W8',
    title: 'SpaceX: Rumo a Marte',
    description: 'A história da colonização espacial e os desafios de levar a humanidade para outro planeta.',
    thumbnail: 'https://picsum.photos/seed/space/800/450',
    duration: '32:10',
    category: 'Espaço'
  }
];

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('home');
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [aiVideos, setAiVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAIContent = async () => {
      setLoading(true);
      const recommendations = await getSmartRecommendations("Paisagens Relaxantes e Natureza");
      if (recommendations) {
        const mapped = recommendations.map((v: any, idx: number) => ({
          ...v,
          id: MOCK_VIDEOS[idx % MOCK_VIDEOS.length].id, // Reuse IDs but get new metadata
          thumbnail: `https://picsum.photos/seed/ai-${idx}/800/450`
        }));
        setAiVideos(mapped);
      }
      setLoading(false);
    };

    fetchAIContent();
  }, []);

  const handleVideoSelect = (video: Video) => {
    setSelectedVideo(video);
    setView('player');
  };

  if (view === 'player' && selectedVideo) {
    return <Player video={selectedVideo} onBack={() => setView('home')} />;
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-black text-white">
      <Sidebar currentView={view} setView={setView} />
      
      <main className="flex-1 overflow-y-auto overflow-x-hidden p-8 md:p-12 space-y-12">
        {/* Banner Section */}
        <section className="relative w-full aspect-[21/9] rounded-3xl overflow-hidden group tv-focus" tabIndex={0}>
          <img 
            src="https://picsum.photos/seed/featured/1600/600" 
            alt="Destaque" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent flex flex-col justify-center p-12">
            <div className="space-y-4 max-w-xl">
              <span className="bg-red-600 text-white px-3 py-1 rounded-md text-sm font-bold tracking-widest uppercase">Especial</span>
              <h1 className="text-5xl md:text-7xl font-black leading-tight">Mundos Invisíveis</h1>
              <p className="text-xl text-neutral-300 font-medium">Uma jornada épica pelas profundezas dos oceanos nunca antes vistas pelo homem.</p>
              <button 
                onClick={() => handleVideoSelect(MOCK_VIDEOS[0])}
                className="bg-white text-black px-10 py-4 rounded-xl font-black text-lg hover:bg-red-600 hover:text-white transition-all tv-focus"
              >
                ASSISTIR AGORA
              </button>
            </div>
          </div>
        </section>

        {/* Recommended Row */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-black tracking-tight border-l-4 border-red-600 pl-4">Recomendados para Você</h2>
            <button className="text-neutral-500 font-bold hover:text-white transition-colors">Ver todos</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
            {MOCK_VIDEOS.map(video => (
              <VideoCard key={video.id + Math.random()} video={video} onClick={() => handleVideoSelect(video)} />
            ))}
          </div>
        </section>

        {/* AI Recommendations Row */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-black tracking-tight border-l-4 border-blue-600 pl-4">Descobertas AI</h2>
            <span className="bg-blue-600 text-[10px] px-2 py-0.5 rounded font-bold uppercase animate-pulse">Beta</span>
          </div>
          {loading ? (
            <div className="flex gap-4 overflow-x-auto pb-4">
               {[1,2,3].map(i => (
                 <div key={i} className="min-w-[350px] aspect-video bg-neutral-900 rounded-2xl animate-pulse"></div>
               ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {aiVideos.map(video => (
                <VideoCard key={video.title} video={video} onClick={() => handleVideoSelect(video)} />
              ))}
            </div>
          )}
        </section>
        
        <footer className="pt-12 pb-8 border-t border-neutral-800 text-center text-neutral-600 text-sm font-medium">
          <p>© 2025 SmartStream HD - A melhor experiência de streaming para sua TV</p>
          <div className="flex justify-center gap-6 mt-4">
             <a href="#" className="hover:text-white transition-colors">Privacidade</a>
             <a href="#" className="hover:text-white transition-colors">Termos</a>
             <a href="#" className="hover:text-white transition-colors">Suporte</a>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default App;
