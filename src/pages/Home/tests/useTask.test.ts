import { act, renderHook, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { LIMIT_CARACTERS } from '@/shared/constants'
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

    expect(result.current.tasks[0].text).toBe('New task text')
  })

  it(`should handle item text change with more than ${LIMIT_CARACTERS} caracters`, () => {
    const { result } = renderHook(useTask)
    const event = { target: { value: 'New task text'.repeat(LIMIT_CARACTERS + 10) } } as unknown as React.ChangeEvent<HTMLTextAreaElement>

    act(() => {
      result.current.handleItemTextChange({ event, index: 0 })
    })

    expect(result.current.tasks[0].text.length).toBe(LIMIT_CARACTERS)
  })

  it('should handle complete item', () => {
    const { result } = renderHook(useTask)
    const event = { target: { value: 'New task text' } } as unknown as React.ChangeEvent<HTMLTextAreaElement>

    act(() => {
      result.current.handleItemTextChange({ event, index: 0 })
    })

    act(() => {
      result.current.handleCompleteItem(0)
    })

    expect(result.current.tasks[0].completed).toBe(true)
    waitFor(
      () => {
        expect(result.current.tasks[0].text).toBe('')
        expect(result.current.tasks[0].placeholder).toBeTruthy()
        expect(result.current.isClearingItem).toBe(false)
      },
      {
        timeout: 1000,
      }
    )
  })

  it('should reorder items', () => {
    const { result } = renderHook(useTask)
    const items = [
      { id: 0, text: '', completed: false, placeholder: '' },
      { id: 1, text: 'Task 1', completed: false, placeholder: '' },
    ]

    const reorderedItems = result.current.reorderItems(items)

    expect(reorderedItems[0].text).toBe('Task 1')
    expect(reorderedItems[1].text).toBe('')
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
    expect(result.current.tasks[0].text).toBe('Task 2')
    expect(result.current.tasks[1].text).toBe('Task 1')
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
})
