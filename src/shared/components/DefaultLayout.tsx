import { Footer } from '@/shared/components/Footer'
import { Outlet } from 'react-router-dom'

function DefaultLayout() {
  return (
    <div className="flex h-screen flex-1 flex-col">
      <main className="flex w-full flex-1 px-4 pt-4 md:items-center md:justify-center md:px-0 md:pt-0">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export default DefaultLayout
