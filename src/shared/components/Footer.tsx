import { Link } from 'react-router-dom'

import { ABOUT_ROUTE, HELP_ROUTE, HOME_ROUTE } from '@/shared/constants'

import { ListChecks } from 'lucide-react'

function Footer() {
  return (
    <footer className="absolute bottom-0 flex w-full items-center justify-between border-t border-t-zinc-100 px-4 py-2 shadow">
      <div className="flex items-center gap-2">
        <Link
          to={HOME_ROUTE}
          className="flex items-center gap-1 text-xs font-semibold text-zinc-700 hover:underline md:text-sm"
        >
          <ListChecks size={16} />
          Tiberius
        </Link>
        {/* <p className="text-xs text-zinc-400 md:text-sm">{new Date().getFullYear()}</p> */}
        <p className="hidden text-xs text-zinc-400 md:block md:text-sm">Concentre-se no presente</p>
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
