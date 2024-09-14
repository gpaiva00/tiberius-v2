import { AI_ONBOARDING_STATES } from '@/shared/constants'
import { useFiniteStateMachine } from '@/shared/hooks'

function useAIOnboarding() {
  const { currentState: currentStep, goToState: goToStep } = useFiniteStateMachine(Object.values(AI_ONBOARDING_STATES))

  return {
    currentStep,
    AI_ONBOARDING_STATES,
    goToStep,
  }
}

export { useAIOnboarding }
