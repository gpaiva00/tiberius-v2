import React, { useState } from 'react'

import { AIOnboardingModal } from './AIOnboardingModal'

const AIOnboardingModalWrapper = React.memo(() => {
  const [isOpen, setIsOpen] = useState(true)

  function handleOpenChange(open: boolean) {
    setIsOpen(open)
  }

  return (
    <AIOnboardingModal
      isOpen={isOpen}
      onOpenChange={handleOpenChange}
    />
  )
})

export { AIOnboardingModalWrapper }
