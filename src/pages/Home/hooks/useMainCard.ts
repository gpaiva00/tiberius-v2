import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { KeyboardEvent, useState } from 'react'

import { useToast } from '@/shared/components/ui/use-toast'
import { getRandomString } from '@/shared/utils/getRandomString'

import { emojis, quotes, titles } from '@/shared/constants/congratulations'
import { placeholders } from '@/shared/constants/itemsPlaceholder'

const emptyItems = Array.from({ length: 5 }, (_, index) => ({
  id: index,
  text: '',
  completed: false,
  placeholder: getRandomString(placeholders),
}))

const listAtom = atomWithStorage<ListItem[]>('@tiberius/items', emptyItems)

interface ListItem {
  id: number
  text: string
  completed: boolean
  placeholder: string
}

function useMainCard() {
  const [showItemNumber] = useState(false)
  const [isClearingItem, setIsClearingItem] = useState(false)

  const [items, setItems] = useAtom(listAtom)
  const { toast } = useToast()

  function handleItemTextChange({
    text,
    index,
  }: {
    text: string
    index: number
    event?: KeyboardEvent<HTMLDivElement>
  }) {
    const newItems = [...items]

    newItems[index].text = text

    setItems(newItems)
  }

  function handleCompleteItem(index: number) {
    const newItems = [...items]

    newItems[index].completed = !newItems[index].completed

    setItems(newItems)

    toast({
      title: `${getRandomString(titles)} ${getRandomString(emojis)}`,
      description: `${getRandomString(quotes)}`,
    })

    clearItem(index)
  }

  function clearItem(index: number) {
    if (isClearingItem) return

    setIsClearingItem(true)

    setTimeout(() => {
      const newItems = [...items]

      newItems[index] = {
        ...newItems[index],
        text: '',
        completed: false,
        placeholder: getRandomString(placeholders),
      }

      setItems(newItems)
      setIsClearingItem(false)
    }, 1500)
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
    const newItems = [...items]
    const [draggedItem] = newItems.splice(dragIndex, 1)

    newItems.splice(index, 0, draggedItem)

    setItems(newItems)
  }

  return {
    textFormatting: [],
    items,
    isClearingItem,
    showItemNumber,
    handleItemTextChange,
    handleCompleteItem,
    handleOnDragItemStart,
    handleOnDragItemOver,
    handleDragItemLeave,
    handleOnDropItem,
  }
}

export { useMainCard }
