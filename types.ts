
export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  category: string;
}

export type ViewState = 'home' | 'player' | 'search' | 'settings';
