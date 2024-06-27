import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { defaultListName } from '@/shared/stores'
import { useMainCard } from '../hooks/useMainCard'

describe('useMainCard', () => {
  afterEach(() => {
    vi.resetAllMocks()
    vi.clearAllMocks()
  })

  it('should handle list name input change', () => {
    const { result } = renderHook(useMainCard)

    act(() => {
      result.current.handleListNameInputChange('list name 1')
    })

    expect(result.current.listNameInputText).toBe('list name 1')
  })

  it('should handle list name input key down (Enter key)', () => {
    const { result } = renderHook(useMainCard)

    const preventDefault = vi.fn()
    const event = { key: 'Enter', preventDefault } as unknown as React.KeyboardEvent<HTMLInputElement>

    act(result.current.toggleIsEditingListName)

    act(() => {
      result.current.handleListNameInputChange('list name 2')
    })

    act(() => {
      result.current.handleListNameInputKeyDown(event)
    })

    expect(preventDefault).toBeCalled()
    expect(result.current.listName).toBe('list name 2')
    expect(result.current.listNameInputText).toBe('list name 2')
    expect(result.current.isEditingListName).toBe(false)
  })

  it('should handle blur list name input with empty text', () => {
    const { result } = renderHook(useMainCard)

    const preventDefault = vi.fn()
    const event = { key: 'Enter', preventDefault } as unknown as React.KeyboardEvent<HTMLInputElement>

    act(result.current.toggleIsEditingListName)

    act(() => {
      result.current.handleListNameInputChange('')
    })

    act(() => {
      result.current.handleListNameInputKeyDown(event)
    })

    expect(result.current.listName).toBe(defaultListName)
    expect(result.current.listNameInputText).toBe(defaultListName)
    expect(result.current.isEditingListName).toBe(false)
  })

  it('should toggle is editing list name', () => {
    const { result } = renderHook(useMainCard)

    act(() => {
      result.current.toggleIsEditingListName()
    })

    expect(result.current.isEditingListName).toBe(true)

    act(() => {
      result.current.toggleIsEditingListName()
    })

    expect(result.current.isEditingListName).toBe(false)
  })
})
