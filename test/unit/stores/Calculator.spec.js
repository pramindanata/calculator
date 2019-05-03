import {
  state as testState,
  getters,
  mutations,
  actions
} from '~/store/calculator'

describe('Store: calculator', () => {
  let state

  beforeEach(() => {
    state = testState()
  })

  describe('# Getters', () => {
    describe('## expression()', () => {
      test('Expression is joined with spaces', () => {
        const state = {
          expressionArr: [1, '+', 2, '*', 3]
        }
        const result = getters.expression(state)

        expect(result).toBe(state.expressionArr.join(' '))
      })
    })

    describe('## result()', () => {
      test('Return correct result', () => {
        const state = {
          expressionArr: [1, '+', 2, '*', 3]
        }
        const result = getters.result(state)

        expect(result).toBe(7)
      })

      test('Return last inserted if expression length less than 2', () => {
        const state = {
          expressionArr: [2],
          lastInserted: 2
        }
        const result = getters.result(state)

        expect(result).toBe(2)
      })
    })
  })

  describe('# Mutations', () => {
    describe('## finish()', () => {
      test('"Done" state should be true', () => {
        mutations.finish(state)

        expect(state.done).toBeTruthy()
      })
    })

    describe('## restart()', () => {
      test('Reset values and set expression with last result', () => {
        const result = 19

        mutations.restart(state, result)
        expect(state.done).toBeFalsy()
        expect(state.expressionArr).toEqual([result])
        expect(state.lastInserted).toBe(result)
      })

      test('Replace NaN result to 0', () => {
        const result = NaN

        mutations.restart(state, result)
        expect(state.expressionArr).toEqual([0])
        expect(state.lastInserted).toBe(0)
      })
    })

    describe('## pushToExpression()', () => {
      test('Successfully push all exp', () => {
        const exp = [1, '+', 'a', 2, 's', 3, '*', '+', 7]

        for (const key in exp) {
          mutations.pushToExpression(state, exp[key])
        }

        expect(state.expressionArr).toEqual([1, '+', 23, '+', 7])
        expect(state.lastInserted).toBe(7)
      })
    })

    describe('## popItem()', () => {
      test('Successfully pop one item from exp', () => {
        state.expressionArr = [1, '+', 2]
        state.lastInserted = 2

        mutations.popItem(state)

        expect(state.expressionArr).toEqual([1, '+'])
        expect(state.lastInserted).toBe('+')
      })

      test('Reset exp if exp length is equal to 1', () => {
        state.expressionArr = [1]
        state.lastInserted = 1

        mutations.popItem(state)

        expect(state.expressionArr).toEqual([0])
        expect(state.lastInserted).toBe(0)
      })
    })

    describe('## reset()', () => {
      test('Reset all values', () => {
        mutations.reset(state)

        expect(state.expressionArr).toEqual([0])
        expect(state.lastInserted).toBe(0)
      })
    })
  })

  describe('# Actions', () => {
    describe('## continueCalculation()', () => {
      test('Get result and reset calculator', () => {
        const getters = {
          result: 15
        }
        const commit = jest.fn()
        const params = { getters, commit }

        actions.continueCalculation(params)

        expect(commit).toBeCalled()
        expect(commit.mock.calls[0][0]).toBe('restart')
        expect(commit.mock.calls[0][1]).toBe(15)
      })
    })
  })
})
