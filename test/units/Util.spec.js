import { isOperator, toPostFix, evalPostFix } from '~/utils/index'

describe('Utility', () => {
  describe('# isOperator()', () => {
    test('Should return true', () => {
      const operators = ['=', '%', '/', '*', '-', '+']

      operators.map(operator => {
        const result = isOperator(operator)

        expect(result).toBeTruthy()
      })
    })

    test('Should return false for other char', () => {
      const operators = [1, 'a', 2, 3]

      operators.map(operator => {
        const result = isOperator(operator)

        expect(result).toBeFalsy()
      })
    })
  })

  describe('# toPostFix()', () => {
    test('Format expression to post fix notation', () => {
      const expression = [12, '+', 53, '/', 2, '-', 42, '*', 1, '*', 3]
      const result = toPostFix(expression)

      expect(result).toEqual([12, 53, 2, '/', '+', 42, 1, '*', 3, '*', '-'])
    })
  })

  describe('# evalPostFix()', () => {
    test('Evaluate post fix notation', () => {
      const postfix = [12, 53, 2, '/', '+', 42, 1, '*', 3, '*', '-']
      const result = evalPostFix(postfix)

      expect(result).toBe(-87.5)
    })
  })
})
