import { atomWithStorage } from 'jotai/utils'

import { LIST_NAME_STORAGE_KEY } from '../constants'

const defaultListName = 'Tarefas'

const listAtom = atomWithStorage<string>(LIST_NAME_STORAGE_KEY, defaultListName)

export { defaultListName, listAtom }
