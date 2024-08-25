import { Task } from '@/shared/types'

function cleanTaskForAI(task: Task): Task {
  const newTask = { ...task }

  return {
    ...newTask,
    placeholder: '',
  }
}

function sortTasksByRecommendationOrder(tasks: Task[]): Task[] {
  return [...tasks].sort((a, b) => {
    const orderA = a.recommendation?.order ?? Infinity
    const orderB = b.recommendation?.order ?? Infinity
    return orderA - orderB
  })
}

export { cleanTaskForAI, sortTasksByRecommendationOrder }
