'use client'

import classnames from 'classnames'

import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { Checkbox } from '@/shared/components/ui/checkbox'
import { Input } from '@/shared/components/ui/input'

import { useMainCard } from '@/pages/Home/hooks'

import { Textarea } from '@/shared/components/ui/textarea'
import { GripVertical } from 'lucide-react'
import { DropdownMenu } from './DropdownMenu'

function MainCard() {
  const {
    items,
    isClearingItem,
    isEditingListName,
    listName,
    listNameInputText,
    canDragItem,
    configs,
    toggleIsEditingListName,
    handleBlurListNameInput,
    handleListNameInputChange,
    handleListNameInputKeyDown,
    handleItemTextChange,
    handleCompleteItem,
    handleOnDragItemStart,
    handleOnDragItemOver,
    handleOnDropItem,
    handleDragItemLeave,
    toggleCanDragItem,
  } = useMainCard()

  return (
    <div className="w-full md:w-auto">
      <CardHeader className="w-full flex-row items-center justify-between md:w-[600px]">
        {isEditingListName ? (
          <Input
            autoFocus
            value={listNameInputText}
            onChange={handleListNameInputChange}
            onKeyDown={handleListNameInputKeyDown}
            onBlur={handleBlurListNameInput}
            onSubmit={handleBlurListNameInput}
            maxLength={20}
          />
        ) : (
          <div className="flex w-full items-center justify-between">
            <CardTitle
              className="text-2xl hover:cursor-pointer hover:underline md:text-3xl dark:text-zinc-300"
              onClick={toggleIsEditingListName}
            >
              {listName}
            </CardTitle>

            <DropdownMenu />
          </div>
        )}
      </CardHeader>

      <Card className="w-full rounded-md border border-zinc-200 shadow-lg md:w-[600px] dark:border-zinc-700 dark:bg-zinc-800">
        <CardContent className="p-0">
          {items.map(({ id, text, completed, placeholder }, index) => (
            <div
              key={index}
              className="flex h-24 space-x-4 border-b px-2 py-2 last:border-b-0 dark:border-b-zinc-700"
              draggable={!!text.length && canDragItem}
              onDragStart={(event) => handleOnDragItemStart(event, index)}
              onDragOver={(event) => handleOnDragItemOver(event)}
              onDrop={(event) => handleOnDropItem(event, index)}
              onDragLeave={(event) => handleDragItemLeave(event)}
            >
              <div className="flex items-start gap-2">
                <button
                  disabled={!text.length}
                  onMouseEnter={toggleCanDragItem}
                  onMouseLeave={toggleCanDragItem}
                  className="mt-[5.4px] cursor-move text-zinc-300 transition-all hover:text-zinc-400 disabled:cursor-not-allowed disabled:text-zinc-200 dark:text-zinc-500 dark:disabled:text-zinc-600"
                >
                  <GripVertical size={16} />
                </button>
                <Checkbox
                  key={`item-${id}`}
                  className="mt-[5.4px] border-zinc-600 transition-all disabled:border-zinc-400 dark:border-zinc-300 dark:disabled:border-zinc-600"
                  checked={completed}
                  disabled={!text.length}
                  onCheckedChange={() => (isClearingItem ? null : handleCompleteItem(index))}
                />
              </div>

              <Textarea
                key={id}
                className={classnames(
                  'm-0 h-full resize-none rounded-none border-none p-0 text-base outline-none ring-0 ring-offset-0 transition-all placeholder:text-zinc-400/70 dark:bg-zinc-800 dark:text-zinc-300 dark:placeholder:text-zinc-600',
                  {
                    'text-zinc-200 line-through dark:text-zinc-500': completed,
                  }
                )}
                value={text}
                onChange={(event) => handleItemTextChange({ event, index })}
                placeholder={configs.hideSuggestions ? '' : placeholder}
                maxLength={250}
              />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

export { MainCard }
