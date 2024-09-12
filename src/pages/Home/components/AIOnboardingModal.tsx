import { Dialog, DialogContent } from '@/shared/components/ui/dialog'

import { AIOnboardingStep1 } from '.'
import { useAIOnboarding } from '../hooks'

interface IAOnboardingModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

function IAOnboardingModal({ isOpen, onOpenChange }: IAOnboardingModalProps) {
  const { currentStep, goToStep, AI_ONBOARDING_STATES } = useAIOnboarding()

  return (
    <Dialog
      open={isOpen}
      onOpenChange={onOpenChange}
    >
      <DialogContent>
        {currentStep === AI_ONBOARDING_STATES.STEP_1 && <AIOnboardingStep1 handleNextStep={goToStep} />}
      </DialogContent>
    </Dialog>
  )
}

export { IAOnboardingModal }
