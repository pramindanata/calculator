import Vue from 'vue'
import { isOperator, toPostFix, evalPostFix } from '~/utils/index'

export const state = () => ({
  expressionArr: [0],
  lastInserted: 0,
  done: false
})

export const getters = {
  expression: state => {
    return state.expressionArr.join(' ')
  },
  result: state => {
    if (state.expressionArr.length < 2) {
      return state.lastInserted
    }

    const postFix = toPostFix(state.expressionArr)
    const result = evalPostFix(postFix)

    return result
  }
}

export const mutations = {
  finish: state => {
    state.done = true
  },
  restart: (state, payload) => {
    state.done = false

    if (isNaN(payload)) {
      payload = 0
    }

    state.expressionArr = [payload]
    state.lastInserted = payload
  },
  pushToExpression: (state, payload) => {
    const lastChar = state.lastInserted
    const lastCharIndex = state.expressionArr.length - 1
    let replace = false
    let char
    let index

    if (Number.isInteger(payload) && Number.isInteger(lastChar)) {
      char = parseInt('' + lastChar + payload)
      index = lastCharIndex
      replace = true
    } else if (isOperator(payload) && isOperator(lastChar)) {
      char = payload
      index = lastCharIndex
      replace = true
    }

    if (replace) {
      state.lastInserted = char
      Vue.set(state.expressionArr, index, char)
    } else if (Number.isInteger(payload) || isOperator(payload)) {
      state.lastInserted = payload
      state.expressionArr.push(payload)
    }
  },
  popItem: state => {
    const expressionLength = state.expressionArr.length

    if (expressionLength > 1) {
      state.expressionArr.splice(expressionLength - 1)
      state.lastInserted = state.expressionArr[expressionLength - 2]
    } else {
      state.expressionArr = [0]
      state.lastInserted = 0
    }
  },
  reset: state => {
    state.expressionArr = [0]
    state.lastInserted = 0
  }
}

export const actions = {
  continueCalculation: ({ commit, getters }) => {
    const result = getters.result

    commit('restart', result)
  }
}
