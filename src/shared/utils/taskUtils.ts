import { Task } from '@/shared/types'

function cleanTaskForAI(task: Task): Task {
  const newTask = { ...task }

  return {
    ...newTask,
    placeholder: '',
  }
}
/**
 * Sort tasks by recommendation order
 *
 * @param tasks - Tasks to sort
 * @returns
 */
function sortTasksByRecommendationOrder(tasks: Task[]): Task[] {
  return [...tasks].sort((a, b) => {
    const orderA = a.recommendation?.order ?? Infinity
    const orderB = b.recommendation?.order ?? Infinity
    return orderA - orderB
  })
}

/**
 * Reorder items based on their description.
 *
 * @description If a task doesn't have a description, it will be placed at the bottom.
 * @param tasks - Items to reorder
 */
function reorderTasksByEmptyDescription(tasks: Task[]) {
  return tasks.sort((a, b) => {
    if (!a.description && b.description) return 1
    if (a.description && !b.description) return -1
    return 0
  })
}

export { cleanTaskForAI, reorderTasksByEmptyDescription, sortTasksByRecommendationOrder }
