import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import SideMenu from '@/components/SideMenu';
import ContentView from '@/components/ContentView';
import type { PageId } from '@/data/pages';

const PAGE_PATHS: Record<PageId, string> = {
  'about-us': '/about',
  'about-daisety': '/daisety',
  terms: '/terms',
  privacy: '/privacy',
};
const PATH_PAGES = Object.fromEntries(
  Object.entries(PAGE_PATHS).map(([id, path]) => [path, id]),
) as Record<string, PageId>;

function pageFromLocation(): PageId | null {
  return PATH_PAGES[window.location.pathname.replace(/\/$/, '') || '/'] ?? null;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activePage, setActivePage] = useState<PageId | null>(pageFromLocation);

  useEffect(() => {
    const handlePopState = () => setActivePage(pageFromLocation());
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('keydown', handleKey);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('keydown', handleKey);
    };
  }, []);

  useEffect(() => {
    const titles: Record<PageId, string> = {
      'about-us': 'About Us | Zhenova Apps',
      'about-daisety': 'About Daisety | Zhenova Apps',
      terms: 'Terms of Service | Daisety',
      privacy: 'Privacy Policy | Daisety',
    };
    document.title = activePage ? titles[activePage] : 'Zhenova Apps';
  }, [activePage]);

  const openPage = (id: PageId) => {
    const path = PAGE_PATHS[id];
    if (window.location.pathname !== path) window.history.pushState({}, '', path);
    setMenuOpen(false);
    setActivePage(id);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const goHome = () => {
    if (window.location.pathname !== '/') window.history.pushState({}, '', '/');
    setActivePage(null);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  if (activePage) {
    return (
      <ContentView
        pageId={activePage}
        onClose={goHome}
        onNavigate={openPage}
      />
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="flex min-h-screen items-center justify-center p-8">
        <a href="/" aria-label="Zhenova Apps home" onClick={(event) => { event.preventDefault(); goHome(); }}>
          <img
            src="/file_00000000e09881f4995198967b881499.png"
            alt="Zhenova Apps"
            className="w-64 animate-fade-in sm:w-80 md:w-[28rem]"
          />
        </a>
      </main>

      <button
        type="button"
        onClick={() => setMenuOpen((open) => !open)}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
        className="fixed right-6 top-6 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white backdrop-blur transition-colors hover:bg-white/10 active:scale-95"
      >
        {menuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <SideMenu open={menuOpen} onClose={() => setMenuOpen(false)} onSelect={openPage} />
    </div>
  );
}

export default App;
