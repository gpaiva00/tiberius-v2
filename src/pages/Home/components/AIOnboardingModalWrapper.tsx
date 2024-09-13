import { useAtom } from 'jotai'
import React from 'react'

import { configsAtom } from '@/shared/stores'
import { AIOnboardingModal } from './AIOnboardingModal'

const AIOnboardingModalWrapper = React.memo(() => {
  const [configs, setConfigs] = useAtom(configsAtom)

  function handleOpenChange(open: boolean) {
    console.warn('handleOpenChange')
    setConfigs((prev) => ({
      ...prev,
      dismissAIOnboarding: open,
    }))
  }

  return (
    <AIOnboardingModal
      isOpen={!configs.dismissAIOnboarding}
      onOpenChange={handleOpenChange}
    />
  )
})

export { AIOnboardingModalWrapper }
