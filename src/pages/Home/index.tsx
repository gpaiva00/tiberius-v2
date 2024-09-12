import { IAOnboardingModal, MainCard } from '@/pages/Home/components'

function Home() {
  return (
    <>
      <MainCard />

      <IAOnboardingModal
        isOpen={true}
        onOpenChange={() => console.log('modal closed')}
      />
    </>
  )
}

export { Home }
