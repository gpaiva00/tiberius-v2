import { Dialog, DialogContent } from '@/shared/components/ui/dialog'

import { AIOnboardingStep1 } from '.'
import { useAIOnboarding } from '../hooks'

interface AIOnboardingModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

function AIOnboardingModal({ isOpen, onOpenChange }: AIOnboardingModalProps) {
  const { currentStep, AI_ONBOARDING_STATES } = useAIOnboarding()

  return (
    <Dialog
      open={isOpen}
      onOpenChange={onOpenChange}
      modal
    >
      <DialogContent>
        {currentStep === AI_ONBOARDING_STATES.STEP_1 && <AIOnboardingStep1 handleNextStep={onOpenChange} />}
      </DialogContent>
    </Dialog>
  )
}

export { AIOnboardingModal }
