import { Toaster } from '@/shared/components/ui/toaster'
import { Provider, createStore } from 'jotai'
import React from 'react'
import ReactDOM from 'react-dom/client'

import { Home } from '@/pages/index.ts'
import { TooltipProvider } from '@/shared/components/ui/tooltip'

import './index.css'

const tiberiusStore = createStore()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={tiberiusStore}>
      <TooltipProvider>
        <Home />
        <Toaster />
      </TooltipProvider>
    </Provider>
  </React.StrictMode>
)
