import { act, renderHook, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { LIMIT_CARACTERS } from '@/shared/constants'
import { Task } from '@/shared/types'
import { useTask } from '../hooks/useTask'

vi.mock('@/shared/components/ui/use-toast', () => ({
  useToast: () => ({
    toast: vi.fn(),
  }),
}))

vi.mock('@/shared/utils/getRandomString', () => ({
  getRandomString: vi.fn(),
}))

describe('useTask', () => {
  afterEach(() => {
    vi.resetAllMocks()
    vi.clearAllMocks()
  })

  it('should handle item text change', () => {
    const { result } = renderHook(useTask)
    const event = { target: { value: 'New task text' } } as unknown as React.ChangeEvent<HTMLTextAreaElement>

    act(() => {
      result.current.handleItemTextChange({ event, index: 0 })
    })

    expect(result.current.tasks[0].description).toBe('New task text')
  })

  it(`should handle item text change with more than ${LIMIT_CARACTERS} caracters`, () => {
    const { result } = renderHook(useTask)
    const event = {
      target: { value: 'New task text'.repeat(LIMIT_CARACTERS + 10) },
    } as unknown as React.ChangeEvent<HTMLTextAreaElement>

    act(() => {
      result.current.handleItemTextChange({ event, index: 0 })
    })

    expect(result.current.tasks[0].description.length).toBe(LIMIT_CARACTERS)
  })

  it('should handle complete item', () => {
    const { result } = renderHook(useTask)
    const event = { target: { value: 'New task text' } } as unknown as React.ChangeEvent<HTMLTextAreaElement>

    act(() => {
      result.current.handleItemTextChange({ event, index: 0 })
    })

    act(() => {
      result.current.handleCompleteTask(result.current.tasks[0].id)
    })

    expect(result.current.tasks[0].completed).toBe(true)
    waitFor(
      () => {
        expect(result.current.tasks[0].description).toBe('')
        expect(result.current.tasks[0].placeholder).toBeTruthy()
      },
      {
        timeout: 1000,
      }
    )
  })

  it('should reorder tasks by empty description', () => {
    const { result } = renderHook(useTask)
    const tasks = [
      { id: '0', description: '', completed: false, placeholder: '' },
      { id: '1', description: 'Task 1', completed: false, placeholder: '' },
    ]

    const reorderedTasks = result.current.reorderTasksByEmptyDescription(tasks as Task[])

    expect(reorderedTasks[0].description).toBe('Task 1')
    expect(reorderedTasks[1].description).toBe('')
  })

  it('should handle on drag item start', () => {
    const { result } = renderHook(useTask)
    const event = {
      dataTransfer: {
        setData: vi.fn(),
      },
    } as unknown as React.DragEvent<HTMLDivElement>

    act(() => {
      result.current.handleOnDragItemStart(event, 0)
    })

    expect(event.dataTransfer.setData).toBeCalledWith('text/plain', '0')
  })

  it('should handle on drag item over', () => {
    const { result } = renderHook(useTask)
    const event = {
      preventDefault: vi.fn(),
      currentTarget: {
        classList: {
          add: vi.fn(),
        },
      },
    } as unknown as React.DragEvent<HTMLDivElement>

    act(() => {
      result.current.handleOnDragItemOver(event)
    })

    expect(event.preventDefault).toBeCalled()
    expect(event.currentTarget.classList.add).toBeCalledWith('drag-over')
  })

  it('should handle drag item leave', () => {
    const { result } = renderHook(useTask)
    const event = {
      currentTarget: {
        classList: {
          remove: vi.fn(),
        },
      },
    } as unknown as React.DragEvent<HTMLDivElement>

    act(() => {
      result.current.handleDragItemLeave(event)
    })

    expect(event.currentTarget.classList.remove).toBeCalledWith('drag-over')
  })

  it('should handle on drop item', () => {
    const { result } = renderHook(useTask)

    const event = {
      preventDefault: vi.fn(),
      currentTarget: {
        classList: {
          remove: vi.fn(),
        },
      },
      dataTransfer: {
        getData: vi.fn().mockReturnValue('0'),
      },
    } as unknown as React.DragEvent<HTMLDivElement>

    let changeEvent = { target: { value: 'Task 1' } } as unknown as React.ChangeEvent<HTMLTextAreaElement>

    act(() => {
      result.current.handleItemTextChange({ event: changeEvent, index: 0 })
    })

    changeEvent = { target: { value: 'Task 2' } } as unknown as React.ChangeEvent<HTMLTextAreaElement>

    act(() => {
      result.current.handleItemTextChange({ event: changeEvent, index: 1 })
    })

    act(() => {
      result.current.handleOnDropItem(event, 1)
    })

    expect(event.preventDefault).toBeCalled()
    expect(event.currentTarget.classList.remove).toBeCalledWith('drag-over')
    expect(result.current.tasks[0].description).toBe('Task 2')
    expect(result.current.tasks[1].description).toBe('Task 1')
  })

  it('should toggle can drag item', () => {
    const { result } = renderHook(useTask)

    act(() => {
      result.current.toggleCanDragItem()
    })

    expect(result.current.canDragItem).toBe(true)

    act(() => {
      result.current.toggleCanDragItem()
    })

    expect(result.current.canDragItem).toBe(false)
  })

  it('should handle organize tasks with AI', async () => {
    const { result } = renderHook(useTask)

    await act(async () => {
      await result.current.handleOrganizeTasksWithAI()
    })

    // Add appropriate expectations based on the behavior of handleOrganizeTasksWithAI
  })
})
