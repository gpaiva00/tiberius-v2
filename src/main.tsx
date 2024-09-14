import { Analytics } from '@vercel/analytics/react'
import { Provider, createStore } from 'jotai'
import React from 'react'
import ReactDOM from 'react-dom/client'

import { Toaster } from '@/shared/components/ui/toaster'
import { TooltipProvider } from '@/shared/components/ui/tooltip'
import { Routes } from '@/shared/routes'

import './main.css'

const tiberiusStore = createStore()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={tiberiusStore}>
      <TooltipProvider>
        <Routes />
        <Toaster />
      </TooltipProvider>
    </Provider>
    <Analytics />
  </React.StrictMode>
)
