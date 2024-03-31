import { Link } from 'react-router-dom'

import { ABOUT_ROUTE, HELP_ROUTE, HOME_ROUTE } from '@/shared/constants'

import { ListChecks } from 'lucide-react'

function Footer() {
  return (
    <footer className="flex w-full items-center justify-between border-t border-t-zinc-100 bg-white px-4 py-2 shadow">
      <div className="flex items-center gap-2">
        <Link
          to={HOME_ROUTE}
          className="flex items-center gap-1 text-xs font-semibold text-zinc-700 hover:underline md:text-sm"
        >
          <ListChecks size={16} />
          Tiberius
          {/* <p className="text-xs text-zinc-400 md:text-sm">{new Date().getFullYear()}</p> */}
          <span className="hidden font-extrabold text-zinc-400 md:block">{'·'}</span>
          <p className="hidden text-xs font-normal text-zinc-400 md:block md:text-sm">Concentre-se no presente</p>
        </Link>
      </div>
      <div className="flex items-center gap-6 md:gap-10">
        <Link
          to={HELP_ROUTE}
          className="text-xs text-zinc-400 hover:underline md:text-sm"
        >
          Ajuda
        </Link>
        <Link
          to={ABOUT_ROUTE}
          className="text-xs text-zinc-400 hover:underline md:text-sm"
        >
          Sobre
        </Link>
        <a
          href="https://gabworkspace.notion.site/Release-Notes-6e2a338ee0ee426490654cded0706c92?pvs=4"
          className="text-xs text-zinc-400 hover:underline md:text-sm"
        >
          Novidades
        </a>
        <a
          href="https://forms.gle/ruRh4v4UHHMthkQ38"
          className="text-xs text-zinc-400 hover:underline md:text-sm"
        >
          Feedback
        </a>
      </div>
    </footer>
  )
}

export { Footer }
