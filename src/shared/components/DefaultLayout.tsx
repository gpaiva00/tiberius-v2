import { Footer } from '@/shared/components/Footer'
import { Outlet } from 'react-router-dom'

function DefaultLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-zinc-900">
      <main className="flex w-full flex-1 overflow-y-scroll px-4 pb-6 pt-4 md:items-center md:justify-center md:px-0 md:pb-0 md:pt-0">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export default DefaultLayout
