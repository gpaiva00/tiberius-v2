import { atomWithStorage } from "jotai/utils";

interface ConfigsProps {
  autoReorder: boolean
  hideSuggestions: boolean
  apperance: 'dark' | 'light' | 'auto'
}

const defaultItems: ConfigsProps = {
  apperance: 'auto',
  autoReorder: true,
  hideSuggestions: false
}

const configsAtom = atomWithStorage<ConfigsProps>('@tiberius/configs', defaultItems)

export { configsAtom };
export type { ConfigsProps };

