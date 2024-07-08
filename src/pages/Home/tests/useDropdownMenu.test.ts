import { act, renderHook, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { useDropdownMenu } from '../hooks/useDropdownMenu'

// Mock do useToast
vi.mock('@/shared/components/ui/use-toast', () => ({
  useToast: () => ({
    toast: vi.fn(),
  }),
}))

describe('useDropdownMenu', () => {
  beforeEach(() => {
    window.matchMedia = vi.fn().mockReturnValue({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })
  })

  afterEach(() => {
    vi.resetAllMocks()
    vi.clearAllMocks()
  })

  it.each(['dark', 'light', 'auto'])('should apply apperance for %s mode', (value) => {
    const { result } = renderHook(useDropdownMenu)

    act(() => {
      result.current.handleChangeApperance(value)
    })

    expect(result.current.configs.apperance).toBe(value)
  })

  it('should handle share Tiberius', () => {
    const { result } = renderHook(useDropdownMenu)

    act(result.current.handleShareTiberius)

    waitFor(() => {
      expect(navigator.clipboard.writeText).toBeCalledWith('https://mytiberius.vercel.app')
      expect(result.current.toast).toBeCalledWith({
        title: 'Link copiado ' + '👍',
        description: 'Agora é só compartilhar com seus amigos!',
      })
    })
  })
})
