import { ArrowLeft, ChevronRight } from 'lucide-react';
import { PAGES, type ContentBlock, type PageId } from '@/data/pages';

type ContentViewProps = {
  pageId: PageId;
  onClose: () => void;
  onNavigate: (id: PageId) => void;
};

export default function ContentView({ pageId, onClose, onNavigate }: ContentViewProps) {
  const page = PAGES[pageId];

  return (
    <div className="min-h-screen bg-black text-white animate-fade-in">
      <header className="sticky top-0 z-10 border-b border-white/10 bg-black/90 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-zinc-200 transition-colors hover:bg-white/10 hover:text-white"
          >
            <ArrowLeft size={16} />
            Back
          </button>
        </div>
      </header>

      <article className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
        <h1 className="text-3xl font-semibold leading-[1.2] tracking-tight sm:text-4xl">
          {page.title}
        </h1>
        {page.lastUpdated && (
          <p className="mt-3 text-sm text-zinc-400">Last updated: {page.lastUpdated}</p>
        )}

        <div className="mt-10 space-y-5">
          {page.blocks.map((block, index) => (
            <Block key={index} block={block} onNavigate={onNavigate} />
          ))}
        </div>
      </article>
    </div>
  );
}

type BlockProps = {
  block: ContentBlock;
  onNavigate: (id: PageId) => void;
};

function Block({ block, onNavigate }: BlockProps) {
  switch (block.type) {
    case 'heading':
      return (
        <h2 className="pt-4 text-lg font-semibold leading-[1.2] text-white">{block.text}</h2>
      );
    case 'paragraph':
      return <p className="text-base leading-6 text-zinc-300">{block.text}</p>;
    case 'list':
      return (
        <ul className="list-disc space-y-2 pl-5 text-base leading-6 text-zinc-300 marker:text-zinc-500">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case 'email':
      return (
        <p className="text-base leading-6 text-zinc-300">
          Email:{' '}
          <a
            href={`mailto:${block.address}`}
            className="font-medium text-white underline underline-offset-4 decoration-zinc-500 transition-colors hover:decoration-white"
          >
            {block.address}
          </a>
        </p>
      );
    case 'pageLinks':
      return (
        <ul className="space-y-2">
          {block.links.map((id) => (
            <li key={id}>
              <button
                type="button"
                onClick={() => onNavigate(id)}
                className="flex w-full items-center justify-between rounded-lg border border-white/10 bg-zinc-950 px-4 py-3 text-left text-base text-zinc-200 transition-colors hover:border-white/25 hover:text-white"
              >
                {PAGES[id].title}
                <ChevronRight size={18} className="text-zinc-500" />
              </button>
            </li>
          ))}
        </ul>
      );
  }
}
