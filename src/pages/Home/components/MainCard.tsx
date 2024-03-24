import classnames from 'classnames'

import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { Checkbox } from '@/shared/components/ui/checkbox'
import { Input } from '@/shared/components/ui/input'

import { useMainCard } from '@/pages/Home/hooks'

import { Textarea } from '@/shared/components/ui/textarea'
import { GripVertical } from 'lucide-react'

function MainCard() {
  const {
    items,
    isClearingItem,
    isEditingListName,
    listName,
    listNameInputText,
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
          <CardTitle
            className="text-2xl hover:cursor-pointer hover:underline md:text-3xl"
            onClick={toggleIsEditingListName}
          >
            {listName}
          </CardTitle>
        )}
      </CardHeader>

      <Card className="w-full rounded-md border border-zinc-200 shadow-lg md:w-[600px]">
        <CardContent className="p-0">
          {items.map(({ id, text, completed, placeholder }, index) => (
            <div
              key={index}
              className="flex h-24 space-x-4 border-b px-2 py-2 last:border-b-0"
              draggable={!!text.length}
              onDragStart={(event) => handleOnDragItemStart(event, index)}
              onDragOver={(event) => handleOnDragItemOver(event)}
              onDrop={(event) => handleOnDropItem(event, index)}
              onDragLeave={(event) => handleDragItemLeave(event)}
            >
              <div className="flex items-start gap-2">
                <button
                  disabled={!text.length}
                  className="mt-[5.4px] cursor-move text-zinc-300 transition-all hover:text-zinc-400 disabled:cursor-not-allowed disabled:text-zinc-200"
                >
                  <GripVertical size={16} />
                </button>
                <Checkbox
                  key={`item-${id}`}
                  className="mt-[5.4px] transition-all disabled:border-zinc-400"
                  checked={completed}
                  disabled={!text.length}
                  onCheckedChange={() => (isClearingItem ? null : handleCompleteItem(index))}
                />
              </div>

              <Textarea
                key={id}
                className={classnames(
                  'm-0 h-full resize-none rounded-none border-none p-0 text-base ring-0 transition-all placeholder:text-zinc-400 focus-visible:ring-0',
                  {
                    'text-zinc-200 line-through': completed,
                  }
                )}
                value={text}
                onChange={(event) => handleItemTextChange({ event, index })}
                placeholder={placeholder}
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
