import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { useState } from 'react'

import { useToast } from '@/shared/components/ui/use-toast'
import { getRandomString } from '@/shared/utils/getRandomString'

import { emojis, placeholders, quotes, titles } from '@/shared/constants'

const emptyItems = Array.from({ length: 5 }, (_, index) => ({
  id: index,
  text: '',
  completed: false,
  placeholder: getRandomString(placeholders),
}))

const defaultListName = 'Tarefas'

const listAtom = atomWithStorage<ListItem[]>('@tiberius/items', emptyItems)
const listNameAtom = atomWithStorage<string>('@tiberius/listName', defaultListName)

interface ListItem {
  id: number
  text: string
  completed: boolean
  placeholder: string
}

function useMainCard() {
  const [items, setItems] = useAtom(listAtom)
  const [listName, setListName] = useAtom(listNameAtom)

  const [showItemNumber] = useState(false)
  const [isClearingItem, setIsClearingItem] = useState(false)
  const [isEditingListName, setIsEditingListName] = useState(false)
  const [listNameInputText, setListNameInputText] = useState(listName)
  const [canDragItem, setCanDragItem] = useState(false)

  const { toast } = useToast()

  function handleItemTextChange({ event, index }: { index: number; event: React.ChangeEvent<HTMLTextAreaElement> }) {
    const newItems = [...items]

    newItems[index].text = event.target.value

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

  function handleListNameInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setListNameInputText(event.currentTarget.value)
  }

  function handleListNameInputKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      handleBlurListNameInput()
      event.preventDefault()
    }
  }

  function handleBlurListNameInput() {
    if (!listNameInputText.length) {
      setListNameInputText(defaultListName)
      setListName(defaultListName)
    } else {
      setListName(listNameInputText)
    }

    toggleIsEditingListName()
  }

  function toggleCanDragItem() {
    setCanDragItem(!canDragItem)
  }

  function toggleIsEditingListName() {
    setIsEditingListName(!isEditingListName)
  }

  return {
    textFormatting: [],
    items,
    isClearingItem,
    showItemNumber,
    listName,
    canDragItem,
    isEditingListName,
    listNameInputText,
    toggleIsEditingListName,
    toggleCanDragItem,
    handleBlurListNameInput,
    handleListNameInputChange,
    handleListNameInputKeyDown,
    handleItemTextChange,
    handleCompleteItem,
    handleOnDragItemStart,
    handleOnDragItemOver,
    handleDragItemLeave,
    handleOnDropItem,
  }
}

export { useMainCard }
