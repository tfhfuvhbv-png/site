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
Object.entries(PAGE_PATHS).map(([id, path]) => [path, id])
) as Record<string, PageId>;

function getPageFromPath(): PageId | null {
return PATH_PAGES[window.location.pathname] ?? null;
}

function App() {
const [menuOpen, setMenuOpen] = useState(false);
const [activePage, setActivePage] = useState<PageId | null>(getPageFromPath);

useEffect(() => {
const handlePopState = () => setActivePage(getPageFromPath());
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
document.title = activePage
? `${activePage === 'about-us' ? 'About Us' : activePage === 'about-daisety' ? 'About Daisety' : activePage === 'terms' ? 'Terms of Service' : 'Privacy Policy'} | Zhenova Apps`
: 'Zhenova Apps';
}, [activePage]);

const openPage = (id: PageId) => {
window.history.pushState({}, '', PAGE_PATHS[id]);
setMenuOpen(false);
setActivePage(id);
window.scrollTo(0, 0);
};

const goHome = () => {
window.history.pushState({}, '', '/');
setActivePage(null);
window.scrollTo(0, 0);
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
