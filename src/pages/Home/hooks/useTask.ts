import { useAtom, useAtomValue } from 'jotai'
import { useMemo, useState } from 'react'

import { useToast } from '@/shared/components/ui/use-toast'

import { useTaskOrganizer } from '@/pages/Home/hooks'
import { emojis, LIMIT_CARACTERS, placeholders, quotes, titles } from '@/shared/constants'
import { configsAtom, tasksAtom } from '@/shared/stores'
import { Task, TaskInputSchema } from '@/shared/types'
import {
  cleanTaskForAI,
  getRandomString,
  nanoid,
  reorderTasksByEmptyDescription,
  sortTasksByRecommendationOrder,
} from '@/shared/utils'

function useTask() {
  const [taskInput, setTaskInput] = useAtom(tasksAtom)
  const configs = useAtomValue(configsAtom)

  const [isClearingItem, setIsClearingItem] = useState(false)
  const [canDragItem, setCanDragItem] = useState(false)

  const { toast } = useToast()
  const { organizeTasksWithAI: _organizeTasksWithAI, isOrganizing, canOrganizeWithAI } = useTaskOrganizer()

  const sortedTasks = useMemo(() => sortTasksByRecommendationOrder(taskInput.tasks), [taskInput.tasks])

  function handleItemTextChange({ event, index }: { index: number; event: React.ChangeEvent<HTMLTextAreaElement> }) {
    const newTasks = [...taskInput.tasks]
    newTasks[index].description = event.target.value.slice(0, LIMIT_CARACTERS)
    setTaskInput({ tasks: newTasks })
  }

  const completeTask = (id: Task['id']) => {
    setTaskInput((prevInput) => {
      const updatedTasks = prevInput.tasks.map((task) => (task.id === id ? { ...task, completed: true } : task))
      return { ...prevInput, tasks: updatedTasks }
    })
  }

  const showCompletionToast = () => {
    toast({
      title: `${getRandomString(titles)} ${getRandomString(emojis)}`,
      description: getRandomString(quotes),
    })
  }

  const addNewTask = () => {
    setTaskInput((prevInput) => {
      const newTask: Task = {
        id: nanoid(),
        description: '',
        placeholder: getRandomString(placeholders),
        lastOrganizedAt: undefined,
        resources: '',
        completed: false,
        recommendation: {
          order: undefined,
          description: getRandomString(placeholders),
        },
        deadline: '',
        priority: undefined,
        quadrant: undefined,
      }

      let updatedTasks = [...prevInput.tasks, newTask]

      if (configs.autoReorder) {
        updatedTasks = reorderTasksByEmptyDescription(updatedTasks)
      }

      return { ...prevInput, tasks: updatedTasks }
    })
  }

  const moveToHistory = (task: Task) => {
    // Implement logic to move the task to history
    // for this moment, we'll just remove task from tasks array
    setTaskInput((prevInput) => {
      const updatedTasks = prevInput.tasks.filter((_task) => _task.id !== task.id)
      return { ...prevInput, tasks: updatedTasks }
    })
  }

  function handleCompleteTask(id: Task['id']) {
    const task = taskInput.tasks.find((task) => task.id === id)
    if (!task) return

    completeTask(id)
    showCompletionToast()

    setTimeout(() => {
      moveToHistory(task)
      addNewTask()
    }, 500)
  }

  function clearTask({ task, newTasks }: { task: Task; newTasks: Task[] }) {
    if (isClearingItem) return

    setIsClearingItem(true)

    // remove completed task from tasks array
    newTasks = newTasks.filter((_task) => _task.id !== task.id)

    setTimeout(() => {
      const _task: Task = {
        id: nanoid(),
        description: '',
        placeholder: getRandomString(placeholders),
        lastOrganizedAt: undefined,
        resources: '',
        completed: false,
        recommendation: {
          order: undefined,
          description: getRandomString(placeholders),
        },
        deadline: '',
        priority: undefined,
        quadrant: undefined,
      }

      newTasks = [...taskInput.tasks, _task]

      if (configs.autoReorder) {
        newTasks = reorderTasksByEmptyDescription(newTasks)
      }

      setTaskInput({ tasks: newTasks })
      setIsClearingItem(false)
    }, 500)
  }

  async function handleOrganizeTasksWithAI() {
    if (!canOrganizeWithAI.canOrganize) {
      toast({
        title: 'Não é possível organizar com IA agora',
        description: canOrganizeWithAI.reason,
      })

      return
    }

    try {
      const newTasks = [...taskInput.tasks]
      const tasksToOrganize = newTasks.filter((task) => task.description.trim() !== '').map(cleanTaskForAI)

      const validatedTasks = TaskInputSchema.parse({ tasks: tasksToOrganize })

      await _organizeTasksWithAI(validatedTasks)
    } catch (error) {
      console.error('Erro ao validar ou organizar tarefas:', error)
      toast({
        title: 'Erro',
        description: 'Ocorreu um erro ao organizar as tarefas. Por favor, tente novamente.',
        variant: 'destructive',
      })
    }
  }

  function handleOnDragItemStart(event: React.DragEvent<HTMLDivElement>, index: number) {
    event.dataTransfer.setData('text/plain', index.toString())
  }

  function handleOnDragItemOver(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault()
    event.currentTarget.classList.add('drag-over')
  }

  function handleDragItemLeave(event: React.DragEvent<HTMLDivElement>) {
    event.currentTarget.classList.remove('drag-over')
  }

  function handleOnDropItem(event: React.DragEvent<HTMLDivElement>, index: number) {
    event.preventDefault()
    event.currentTarget.classList.remove('drag-over')
    const dragIndex = Number(event.dataTransfer.getData('text/plain'))
    const newTasks = [...taskInput.tasks]
    const [draggedItem] = newTasks.splice(dragIndex, 1)

    newTasks.splice(index, 0, draggedItem)

    setTaskInput({ tasks: newTasks })
  }

  function toggleCanDragItem() {
    setCanDragItem(!canDragItem)
  }

  return {
    tasks: sortedTasks,
    canOrganizeWithAI,
    reorderTasksByEmptyDescription,
    canDragItem,
    isOrganizing,
    isClearingItem,
    toggleCanDragItem,
    handleOnDropItem,
    handleOrganizeTasksWithAI,
    handleCompleteTask,
    handleDragItemLeave,
    handleOnDragItemOver,
    handleOnDragItemStart,
    handleItemTextChange,
  }
}

export { useTask }
