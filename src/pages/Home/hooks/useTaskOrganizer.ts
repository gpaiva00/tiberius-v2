import { useAtom } from 'jotai'
import { useMemo, useState } from 'react'

import { ASK_FOR_TASKS_PROMPT } from '@/shared/constants/prompts'
import { tasksAtom } from '@/shared/stores'
import { getPromptResult, isTestText, sortTasksByRecommendationOrder } from '@/shared/utils'

import {
    MAX_ORGANIZATIONS_PER_DAY,
    MIN_TASKS,
    MIN_TIME_BETWEEN_ORGANIZATIONS,
    MIN_TIME_SINCE_LAST_TASK_ORGANIZATION,
} from '@/shared/constants'
import { TaskInput, TaskOutput } from '@/shared/types'

type OrganizationReasonCode =
  | 'MIN_TASKS'
  | 'TEST_TEXT'
  | 'MIN_TIME_BETWEEN_ORGANIZATIONS'
  | 'MAX_ORGANIZATIONS_PER_DAY'
  | 'RECENTLY_ORGANIZED'

interface CanOrganizeWithAI {
  canOrganize: boolean
  reason?: string
  reasonCode?: OrganizationReasonCode
}

function useTaskOrganizer() {
  const [taskInput, setTaskInput] = useAtom(tasksAtom)
  const [isOrganizing, setIsOrganizing] = useState(false)
  const [lastOrganizationTime, setLastOrganizationTime] = useState(0)
  const [organizationsToday, setOrganizationsToday] = useState(0)

  async function organizeTasksWithAI(validatedTasks: TaskInput) {
    if (!canOrganizeWithAI.canOrganize) {
      throw new Error(canOrganizeWithAI.reason)
    }

    setIsOrganizing(true)

    try {
      const prompt = `${ASK_FOR_TASKS_PROMPT}\n${JSON.stringify(validatedTasks)}`

      const organizedTasks: TaskOutput = await getPromptResult(prompt)

      if (!organizedTasks.tasks || organizedTasks.tasks.length === 0) {
        throw new Error('A IA não retornou tarefas organizadas válidas.')
      }

      const updatedTasks = taskInput.tasks.map((task) => {
        const organizedTask = organizedTasks.tasks.find((_task) => _task.id === task.id)
        return organizedTask ? { ...task, ...organizedTask, lastOrganizedAt: Date.now() } : task
      })

      const sortedTasks = sortTasksByRecommendationOrder(updatedTasks)

      setTaskInput({ tasks: sortedTasks })
      setLastOrganizationTime(Date.now())
      setOrganizationsToday((prev) => prev + 1)
    } catch (error) {
      console.error('Erro ao organizar tarefas:', error)
      throw error // Re-throw the error to be caught in useTask
    } finally {
      setIsOrganizing(false)
    }
  }

  const canOrganizeWithAI: CanOrganizeWithAI = useMemo(() => {
    const nonEmptyTasks = taskInput.tasks.filter((task) => task.description.trim() !== '')
    const now = Date.now()

    if (nonEmptyTasks.length < MIN_TASKS) {
      return {
        canOrganize: false,
        reason: `Você precisa de pelo menos ${MIN_TASKS} tarefas não vazias para organizar com IA.`,
        reasonCode: 'MIN_TASKS',
      }
    }

    const testTasks = nonEmptyTasks.filter((task) => isTestText(task.description))
    if (testTasks.length > 0) {
      return {
        canOrganize: false,
        reason: 'Algumas tarefas parecem ser texto de teste. Por favor, forneça descrições de tarefas reais.',
        reasonCode: 'TEST_TEXT',
      }
    }

    if (now - lastOrganizationTime < MIN_TIME_BETWEEN_ORGANIZATIONS) {
      const remainingTime = Math.ceil((MIN_TIME_BETWEEN_ORGANIZATIONS - (now - lastOrganizationTime)) / 60000)
      return {
        canOrganize: false,
        reason: `Por favor, aguarde mais ${remainingTime} minuto antes de organizar novamente.`,
        reasonCode: 'MIN_TIME_BETWEEN_ORGANIZATIONS',
      }
    }

    if (organizationsToday >= MAX_ORGANIZATIONS_PER_DAY) {
      return {
        canOrganize: false,
        reason: `Você atingiu o limite de ${MAX_ORGANIZATIONS_PER_DAY} organizações por dia.`,
        reasonCode: 'MAX_ORGANIZATIONS_PER_DAY',
      }
    }

    const recentlyOrganizedTask = taskInput.tasks.find(
      (task) => task.lastOrganizedAt && now - task.lastOrganizedAt < MIN_TIME_SINCE_LAST_TASK_ORGANIZATION
    )
    if (recentlyOrganizedTask) {
      return {
        canOrganize: false,
        reason:
          'Algumas tarefas foram organizadas recentemente. Por favor, aguarde um pouco antes de organizar novamente.',
        reasonCode: 'RECENTLY_ORGANIZED',
      }
    }

    return { canOrganize: true }
  }, [taskInput.tasks, lastOrganizationTime, organizationsToday])

  return { organizeTasksWithAI, isOrganizing, canOrganizeWithAI }
}

export { useTaskOrganizer }
export type { OrganizationReasonCode }

