import { useAtom, useAtomValue } from 'jotai'
import { useMemo, useState } from 'react'

import { useToast } from '@/shared/components/ui/use-toast'

import { useTaskOrganizer } from '@/pages/Home/hooks/useTaskOrganizer'
import { emojis, LIMIT_CARACTERS, placeholders, quotes, titles } from '@/shared/constants'
import { configsAtom, tasksAtom } from '@/shared/stores'
import { Task, TaskInputSchema } from '@/shared/types'
import { cleanTaskForAI, getRandomString, sortTasksByRecommendationOrder } from '@/shared/utils'

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

  function handleCompleteItem(index: number) {
    const newTasks = [...taskInput.tasks]
    newTasks[index].completed = !newTasks[index].completed
    setTaskInput({ tasks: newTasks })

    toast({
      title: `${getRandomString(titles)} ${getRandomString(emojis)}`,
      description: `${getRandomString(quotes)}`,
    })

    clearItem(index)
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

  function reorderItems(items: Task[]) {
    return items.sort((a, b) => {
      if (!a.description && b.description) return 1
      if (a.description && !b.description) return -1
      return 0
    })
  }

  function clearItem(index: number) {
    if (isClearingItem) return

    setIsClearingItem(true)

    setTimeout(() => {
      let newTasks = [...taskInput.tasks]
      newTasks[index] = {
        ...newTasks[index],
        description: '',
        completed: false,
        recommendation: {
          ...newTasks[index].recommendation,
          description: getRandomString(placeholders),
        },
        deadline: '',
        priority: undefined,
        quadrant: undefined,
      }

      if (configs.autoReorder) {
        newTasks = reorderItems(newTasks)
      }

      setTaskInput({ tasks: newTasks })
      setIsClearingItem(false)
    }, 1000)
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
    canOrganizeTasksWithAI: canOrganizeWithAI.canOrganize,
    organizationReason: canOrganizeWithAI.reason,
    reorderItems,
    canDragItem,
    isOrganizing,
    isClearingItem,
    toggleCanDragItem,
    handleOnDropItem,
    handleOrganizeTasksWithAI,
    handleCompleteItem,
    handleDragItemLeave,
    handleOnDragItemOver,
    handleOnDragItemStart,
    handleItemTextChange,
  }
}

export { useTask }
