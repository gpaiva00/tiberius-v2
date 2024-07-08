import { describe, expect, it } from 'vitest'

import { toggleArrayItem } from '@/shared/utils/toggleArrayItem'

describe('toggleArrayItem', () => {
  it('should add item to array if not present', () => {
    const arr = ['apple', 'banana']
    const result = toggleArrayItem(arr, 'cherry')
    expect(result).toEqual(['apple', 'banana', 'cherry'])
  })

  it('should remove item from array if present', () => {
    const arr = ['apple', 'banana', 'cherry']
    const result = toggleArrayItem(arr, 'banana')
    expect(result).toEqual(['apple', 'cherry'])
  })

  it('should handle empty array', () => {
    const arr: string[] = []
    const result = toggleArrayItem(arr, 'apple')
    expect(result).toEqual(['apple'])
  })

  it('should handle single item array', () => {
    const arr = ['apple']
    const result = toggleArrayItem(arr, 'apple')
    expect(result).toEqual([])
  })

  it('should handle multiple occurrences of item in array', () => {
    const arr = ['apple', 'banana', 'banana', 'cherry']
    const result = toggleArrayItem(arr, 'banana')
    expect(result).toEqual(['apple', 'cherry'])
  })
})
