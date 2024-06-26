import { atomWithStorage } from 'jotai/utils'

const defaultListName = 'Tarefas'

const listAtom = atomWithStorage<string>('@tiberius/listName', defaultListName)

export { defaultListName, listAtom }
