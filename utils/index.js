export const operatorPrecedence = {
  '+': 1,
  '-': 1,
  '*': 2,
  '/': 2,
  '%': 2
}

export const evalOperator = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => a / b,
  '%': (a, b) => a % b
}

export const isOperator = value => {
  if (
    value === '=' ||
    value === '%' ||
    value === '/' ||
    value === '*' ||
    value === '-' ||
    value === '+'
  ) {
    return true
  }

  return false
}

export const toPostFix = expression => {
  let resultStack = []
  const operatorStack = []

  for (let i = 0; i < expression.length; i++) {
    const char = expression[i]

    if (isOperator(char)) {
      while (operatorStack.length > 0) {
        const lastIndex = operatorStack.length - 1
        const lastOnOpStack = operatorStack[lastIndex]

        if (operatorPrecedence[char] <= operatorPrecedence[lastOnOpStack]) {
          resultStack.push(operatorStack.splice(lastIndex)[0])
        } else {
          break
        }
      }

      operatorStack.push(char)
    } else {
      resultStack.push(char)
    }
  }

  if (operatorStack.length > 0) {
    resultStack = resultStack.concat(operatorStack.reverse())
  }

  return resultStack
}

export const evalPostFix = expression => {
  let result = 0
  const stack = []

  for (let i = 0; i < expression.length; i++) {
    const token = expression[i]
    const stackLastIndex = stack.length - 1

    if (isOperator(token)) {
      const b = stack.splice(stackLastIndex)[0]
      const a = stack.splice(stackLastIndex - 1)[0]

      result = evalOperator[token](a, b)

      stack.push(result)
    } else {
      stack.push(token)
    }
  }

  return result
}
