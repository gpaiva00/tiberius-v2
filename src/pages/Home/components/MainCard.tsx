'use client'

import classnames from 'classnames'

import { Badge } from '@/shared/components/ui/badge'
import { Button } from '@/shared/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { Checkbox } from '@/shared/components/ui/checkbox'
import { Input } from '@/shared/components/ui/input'
import { Textarea } from '@/shared/components/ui/textarea'

import { DropdownMenu } from '@/pages/Home/components/DropdownMenu'
import { useMainCard, useTask } from '@/pages/Home/hooks'

import { LIMIT_CARACTERS } from '@/shared/constants'

import { cn } from '@/lib/utils'

import { GripVertical, Info, Sparkles } from 'lucide-react'

function MainCard() {
  const {
    isEditingListName,
    listName,
    listNameInputText,
    configs,
    toggleIsEditingListName,
    handleBlurListNameInput,
    handleListNameInputChange,
    handleListNameInputKeyDown,
  } = useMainCard()

  const {
    tasks,
    canDragItem,
    handleOnDropItem,
    handleCompleteItem,
    handleDragItemLeave,
    handleItemTextChange,
    handleOnDragItemOver,
    handleOnDragItemStart,
    toggleCanDragItem,
    isClearingItem,
    canOrganizeTasksWithAI,
    isOrganizing,
    handleOrganizeTasksWithAI,
  } = useTask()

  return (
    <div className="w-full md:w-auto">
      <CardHeader className="w-full flex-row items-center justify-between md:w-[600px]">
        {isEditingListName ? (
          <Input
            autoFocus
            value={listNameInputText}
            onChange={(event) => handleListNameInputChange(event.currentTarget.value)}
            onKeyDown={handleListNameInputKeyDown}
            onBlur={handleBlurListNameInput}
            onSubmit={handleBlurListNameInput}
            maxLength={20}
          />
        ) : (
          <div className="flex w-full items-center justify-between">
            <CardTitle
              className="text-2xl underline-offset-4 hover:cursor-pointer hover:underline md:text-2xl dark:text-zinc-300"
              onClick={toggleIsEditingListName}
            >
              {listName}
            </CardTitle>
            <div className="flex items-center space-x-4">
              <Button
                variant="default"
                disabled={isOrganizing}
                onClick={handleOrganizeTasksWithAI}
                className={cn('gap-2', {
                  'animate-pulse': isOrganizing,
                })}
              >
                <Sparkles className="h-4 w-4" />
                {isOrganizing ? 'Organizando...' : 'Organizar com IA'}
                {!canOrganizeTasksWithAI && <Info className="h-4 w-4 text-orange-500" />}
              </Button>
              <DropdownMenu />
            </div>
          </div>
        )}
      </CardHeader>

      <Card className="w-full rounded-md border border-zinc-200 shadow-lg md:w-[600px] dark:border-zinc-800 dark:bg-zinc-950">
        <CardContent className="p-0">
          {tasks.map(({ id, description, completed, placeholder, quadrant }, index) => (
            <>
              <div
                key={index}
                className="flex h-24 space-x-4 border-b px-2 py-2 last:border-b-0 dark:border-b-zinc-800"
                draggable={!description.length && canDragItem}
                onDragStart={(event) => handleOnDragItemStart(event, index)}
                onDragOver={(event) => handleOnDragItemOver(event)}
                onDrop={(event) => handleOnDropItem(event, index)}
                onDragLeave={(event) => handleDragItemLeave(event)}
              >
                {quadrant && (
                  <div className="flex w-full flex-col items-end justify-center pr-4 pt-2">
                    <Badge variant="default">{quadrant}</Badge>
                  </div>
                )}
                <div className="flex items-start gap-2">
                  <button
                    disabled={!description.length}
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
                    disabled={!description.length}
                    onCheckedChange={() => (isClearingItem ? null : handleCompleteItem(index))}
                  />
                </div>

                <Textarea
                  key={id}
                  className={classnames(
                    'm-0 h-full resize-none rounded-none border-none p-0 text-base outline-none ring-0 ring-offset-0 transition-all placeholder:text-zinc-400/70 dark:bg-zinc-950 dark:text-zinc-300 dark:placeholder:text-zinc-600',
                    {
                      'text-zinc-200 line-through dark:text-zinc-500': completed,
                    }
                  )}
                  value={description}
                  onChange={(event) => handleItemTextChange({ event, index })}
                  placeholder={configs?.hideSuggestions ? '' : placeholder}
                  maxLength={LIMIT_CARACTERS}
                />
              </div>
            </>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

export { MainCard }
