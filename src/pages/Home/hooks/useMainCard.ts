import { useAtom, useAtomValue } from 'jotai'
import { useState } from 'react'

import { configsAtom, defaultListName, listAtom } from '@/shared/stores'

function useMainCard() {
  const [listName, setListName] = useAtom(listAtom)
  const configs = useAtomValue(configsAtom)

  const [showItemNumber] = useState(false)
  const [isEditingListName, setIsEditingListName] = useState(false)
  const [listNameInputText, setListNameInputText] = useState(listName)

  function handleListNameInputChange(value: string) {
    setListNameInputText(value)
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

  function toggleIsEditingListName() {
    setIsEditingListName(!isEditingListName)
  }

  return {
    textFormatting: [],
    showItemNumber,
    listName,
    configs,
    isEditingListName,
    listNameInputText,
    toggleIsEditingListName,
    handleBlurListNameInput,
    handleListNameInputChange,
    handleListNameInputKeyDown,
  }
}

export { useMainCard }
