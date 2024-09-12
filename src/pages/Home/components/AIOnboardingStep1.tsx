import { Badge } from '@/shared/components/ui/badge'
import { Button } from '@/shared/components/ui/button'
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog'

// type AIOnboardingState = (typeof AI_ONBOARDING_STATES)[keyof typeof AI_ONBOARDING_STATES]

interface AIOnboardingStep1Props {
  handleNextStep: (open: boolean) => void
}

function AIOnboardingStep1({ handleNextStep }: AIOnboardingStep1Props) {
  return (
    <DialogContent>
      <DialogHeader>
        <img
          src="/src/assets/ai-onboarding.png"
          alt="Onboarding AI"
          className="h-auto w-full"
          loading="lazy"
        />
        <DialogTitle className="flex flex-row items-center gap-2 text-xl">
          Se organize com o Tiberius AI <Badge className="h-fit w-fit">Beta</Badge>
        </DialogTitle>
      </DialogHeader>
      <DialogDescription className="text-base">
        Tem muita coisa pra fazer e não sabe por onde começar? Deixe a ansiedade pra lá e veja como a inteligência
        artificial do Tiberius vai te ajudar a organizar suas tarefas.
      </DialogDescription>
      <DialogFooter className="mt-4">
        <Button onClick={() => handleNextStep(false)}>Vamos lá</Button>
      </DialogFooter>
    </DialogContent>
  )
}

export { AIOnboardingStep1 }
