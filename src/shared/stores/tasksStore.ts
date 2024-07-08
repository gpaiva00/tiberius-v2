import { atomWithStorage } from 'jotai/utils'

import { placeholders, TASKS_STORAGE_KEY } from '@/shared/constants'
import { getRandomString } from '@/shared/utils/getRandomString'

import { ListItem } from '@/shared/types'

const emptyItems = Array.from({ length: 5 }, (_, index) => ({
  id: index,
  text: '',
  completed: false,
  placeholder: getRandomString(placeholders),
}))

const tasksAtom = atomWithStorage<ListItem[]>(TASKS_STORAGE_KEY, emptyItems)

export { tasksAtom }
