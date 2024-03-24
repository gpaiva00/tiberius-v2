import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'

import DefaultLayout from '@/shared/components/DefaultLayout'

import { ABOUT_ROUTE, HELP_ROUTE, HOME_ROUTE } from '@/shared/constants'

import { About, Help, Home } from '@/pages'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<DefaultLayout />}>
      <Route
        index
        path={HOME_ROUTE}
        element={<Home />}
      />
      <Route
        index
        path={ABOUT_ROUTE}
        element={<About />}
      />
      <Route
        index
        path={HELP_ROUTE}
        element={<Help />}
      />
    </Route>
  )
)

function Routes() {
  return <RouterProvider router={router} />
}

export { Routes }
