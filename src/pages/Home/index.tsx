import { ListChecks } from 'lucide-react'

import { MainCard } from '@/pages/Home/components'

function Home() {
  return (
    <div className="flex h-screen flex-1 flex-col">
      <main className="flex w-full flex-1 px-4 md:items-center md:justify-center md:px-0">
        <MainCard />
      </main>

      <footer className="absolute bottom-0 flex w-full items-center justify-between border-t border-t-zinc-100 px-4 py-2 shadow">
        <div className="flex items-center gap-2">
          <h4 className="flex items-center gap-1 text-xs font-semibold text-zinc-700 md:text-sm">
            <ListChecks size={16} />
            Tiberius
          </h4>
          <p className="text-xs text-zinc-400 md:text-sm">{new Date().getFullYear()}</p>
        </div>
        <div className="flex items-center gap-10">
          <a
            href="#"
            className="text-xs text-zinc-400 hover:underline md:text-sm"
          >
            Ajuda
          </a>
          <a
            href="#"
            className="text-xs text-zinc-400 hover:underline md:text-sm"
          >
            Sobre
          </a>
          {/* <a
            href="#"
            className="text-xs text-zinc-400 hover:underline md:text-sm"
          >
            Política de Privacidade
          </a> */}
        </div>
      </footer>
    </div>
  )
}

export { Home }
