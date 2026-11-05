import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import SideMenu from '@/components/SideMenu';
import ContentView from '@/components/ContentView';
import type { PageId } from '@/data/pages';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activePage, setActivePage] = useState<PageId | null>(null);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const openPage = (id: PageId) => {
    setMenuOpen(false);
    setActivePage(id);
  };

  if (activePage) {
    return (
      <ContentView
        pageId={activePage}
        onClose={() => setActivePage(null)}
        onNavigate={openPage}
      />
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="flex min-h-screen items-center justify-center p-8">
        <img
          src="/file_00000000e09881f4995198967b881499.png"
          alt="Zhenova Apps"
          className="w-64 animate-fade-in sm:w-80 md:w-[28rem]"
        />
      </main>

      <button
        type="button"
        onClick={() => setMenuOpen((open) => !open)}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        className="fixed right-6 top-6 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white backdrop-blur transition-colors hover:bg-white/10 active:scale-95"
      >
        {menuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <SideMenu open={menuOpen} onClose={() => setMenuOpen(false)} onSelect={openPage} />
    </div>
  );
}

export default App;
