import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { useMainCard, useTask } from '@/pages/Home/hooks'
import { MainCard } from '../components/MainCard'

vi.mock('@/pages/Home/hooks', async (importOriginal) => {
  const actual = await importOriginal<object>()

  return {
    ...actual,
    useMainCard: vi.fn(),
    useTask: vi.fn(),
  }
})

describe('MainCard component', () => {
  beforeEach(() => {
    window.matchMedia = vi.fn().mockReturnValue({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })
  })

  it('should render component', () => {
    useMainCard.mockReturnValue({
      listNameInputText: '',
      isEditingListName: false,
      listName: 'Tarefas',
      configs: { hideSuggestions: false },
      handleListNameInputChange: vi.fn(),
      handleListNameInputKeyDown: vi.fn(),
      handleBlurListNameInput: vi.fn(),
      toggleIsEditingListName: vi.fn(),
    })

    useTask.mockReturnValue({
      tasks: [
        {
          id: 0,
          text: 'task 1',
          completed: false,
          placeholder: '',
        },
        {
          id: 1,
          text: 'task 2',
          completed: false,
          placeholder: '',
        },
        {
          id: 2,
          text: 'task 3',
          completed: false,
          placeholder: '',
        },
        {
          id: 3,
          text: 'task 4',
          completed: false,
          placeholder: '',
        },
        {
          id: 4,
          text: 'task 5',
          completed: false,
          placeholder: '',
        },
      ],
      canDragItem: false,
      isClearingItem: false,
      handleOnDropItem: vi.fn(),
      handleCompleteItem: vi.fn(),
      handleDragItemLeave: vi.fn(),
      handleItemTextChange: vi.fn(),
      handleOnDragItemOver: vi.fn(),
      handleOnDragItemStart: vi.fn(),
      toggleCanDragItem: vi.fn(),
    })

    render(<MainCard />)

    expect(screen.getByRole('heading', { name: 'Tarefas' })).toBeDefined()

    expect(screen.getAllByRole('textbox')).toHaveLength(5)
  })
})
