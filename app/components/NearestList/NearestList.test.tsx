import { expect, test } from 'vitest'

const sum = (n1: number, n2: number) => n1 + n2

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3)
})
