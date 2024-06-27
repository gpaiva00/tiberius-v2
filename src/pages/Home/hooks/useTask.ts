import { useAtom, useAtomValue } from 'jotai'
import { useState } from 'react'

import { useToast } from '@/shared/components/ui/use-toast'
import { getRandomString } from '@/shared/utils/getRandomString'

import { emojis, LIMIT_CARACTERS, placeholders, quotes, titles } from '@/shared/constants'
import { configsAtom, tasksAtom } from '@/shared/stores'

import { ListItem } from '@/shared/types'

function useTask() {
  const [tasks, setTasks] = useAtom(tasksAtom)

  const [isClearingItem, setIsClearingItem] = useState(false)
  const [canDragItem, setCanDragItem] = useState(false)

  const { toast } = useToast()
  const configs = useAtomValue(configsAtom)

  function handleItemTextChange({ event, index }: { index: number; event: React.ChangeEvent<HTMLTextAreaElement> }) {
    const newTasks = [...tasks]

    newTasks[index].text = event.target.value.slice(0, LIMIT_CARACTERS)

    setTasks(newTasks)
  }

  function handleCompleteItem(index: number) {
    const newTasks = [...tasks]

    newTasks[index].completed = !newTasks[index].completed

    setTasks(newTasks)

    toast({
      title: `${getRandomString(titles)} ${getRandomString(emojis)}`,
      description: `${getRandomString(quotes)}`,
    })

    clearItem(index)
  }

  function reorderItems(items: ListItem[]) {
    const newTasks = [...items]

    newTasks.sort((a, b) => {
      if (!a.text && b.text) return 1
      if (a.text && !b.text) return -1

      return 0
    })

    return newTasks
  }

  function clearItem(index: number) {
    if (isClearingItem) return

    setIsClearingItem(true)

    setTimeout(() => {
      let newTasks = [...tasks]

      newTasks[index] = {
        ...newTasks[index],
        text: '',
        completed: false,
        placeholder: getRandomString(placeholders),
      }

      if (configs.autoReorder) {
        newTasks = reorderItems(newTasks)
      }

      setTasks(newTasks)

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
    const newTasks = [...tasks]
    const [draggedItem] = newTasks.splice(dragIndex, 1)

    newTasks.splice(index, 0, draggedItem)

    setTasks(newTasks)
  }

  function toggleCanDragItem() {
    setCanDragItem(!canDragItem)
  }

  return {
    tasks,
    reorderItems,
    canDragItem,
    isClearingItem,
    toggleCanDragItem,
    handleOnDropItem,
    handleCompleteItem,
    handleDragItemLeave,
    handleOnDragItemOver,
    handleOnDragItemStart,
    handleItemTextChange,
  }
}

export { useTask }
