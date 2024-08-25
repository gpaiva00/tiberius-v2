import { atomWithStorage } from 'jotai/utils'

import { LIMIT_TASKS, placeholders, TASKS_STORAGE_KEY } from '@/shared/constants'
import { TaskInput } from '@/shared/types'
import { getRandomString } from '@/shared/utils/getRandomString'

const initialTasks: TaskInput = {
  tasks: Array.from({ length: LIMIT_TASKS }, (_, index) => ({
    id: index,
    description: '',
    completed: false,
    placeholder: getRandomString(placeholders),
    recommendation: {
      order: 0,
      description: '',
    },
  })),
}

const tasksAtom = atomWithStorage<TaskInput>(TASKS_STORAGE_KEY, initialTasks)

export { tasksAtom }
