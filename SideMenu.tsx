import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { DAISETY_PAGES, PAGES, type PageId } from '@/data/pages';

type SideMenuProps = {
  open: boolean;
  onClose: () => void;
  onSelect: (id: PageId) => void;
};

const itemClass =
  'flex w-full items-center rounded-lg px-4 py-3 text-left text-base text-zinc-200 transition-colors hover:bg-white/5 hover:text-white';

export default function SideMenu({ open, onClose, onSelect }: SideMenuProps) {
  const [daisetyOpen, setDaisetyOpen] = useState(false);

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-30 bg-black/60 transition-opacity duration-300 ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />
      <aside
        className={`fixed right-0 top-0 z-40 flex h-full w-full max-w-sm flex-col border-l border-white/10 bg-zinc-950 pt-24 transition-[transform,visibility] duration-300 ease-out ${
          open ? 'visible translate-x-0' : 'invisible translate-x-full'
        }`}
      >
        <nav className="flex-1 overflow-y-auto px-4 pb-8">
          <ul className="space-y-1">
            <li>
              <button type="button" className={itemClass} onClick={() => onSelect('about-us')}>
                {PAGES['about-us'].menuLabel}
              </button>
            </li>
            <li>
              <button
                type="button"
                aria-expanded={daisetyOpen}
                onClick={() => setDaisetyOpen((o) => !o)}
                className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-left text-base font-medium text-white transition-colors hover:bg-white/5"
              >
                Daisety
                <ChevronDown
                  size={18}
                  className={`text-zinc-400 transition-transform duration-300 ${
                    daisetyOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                  daisetyOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <ul className="overflow-hidden pl-4">
                  {DAISETY_PAGES.map((id) => (
                    <li key={id}>
                      <button type="button" className={itemClass} onClick={() => onSelect(id)}>
                        {PAGES[id].menuLabel}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
}
