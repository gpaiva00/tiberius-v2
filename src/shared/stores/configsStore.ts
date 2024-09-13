import { atomWithStorage } from 'jotai/utils'

import { CONFIGS_STORAGE_KEY } from '@/shared/constants'

interface ConfigsProps {
  autoReorder: boolean
  hideSuggestions: boolean
  apperance: 'dark' | 'light' | 'auto'
  dismissAIOnboarding: boolean
}

const defaultItems: ConfigsProps = {
  apperance: 'auto',
  autoReorder: true,
  hideSuggestions: false,
  dismissAIOnboarding: false,
}

const configsAtom = atomWithStorage<ConfigsProps>(CONFIGS_STORAGE_KEY, defaultItems)

export { configsAtom }
export type { ConfigsProps }
