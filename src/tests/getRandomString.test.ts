import { describe, expect, it } from 'vitest'

import { getRandomString } from '@/shared/utils/getRandomString'

describe('getRandomString', () => {
  it('should return a random string from the provided array', () => {
    const data = ['apple', 'banana', 'cherry']
    const result = getRandomString(data)
    expect(data).toContain(result)
  })

  it('should handle an empty array', () => {
    const data: string[] = []
    const result = getRandomString(data)
    expect(result).toBeUndefined()
  })

  it('should handle single item array', () => {
    const data = ['apple']
    const result = getRandomString(data)
    expect(result).toBe('apple')
  })
})
