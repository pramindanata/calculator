import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import { mount } from '@vue/test-utils'
import Display from '~/components/Display'

describe('Components: Display.vue', () => {
  let wrapper
  let store

  beforeAll(() => {
    Vue.use(Vuetify)
    Vue.use(Vuex)

    store = new Vuex.Store({
      modules: {
        calculator: {
          namespaced: true,
          getters: {
            expression: () => '1 + 2 + 3 / 4',
            result: () => 27
          }
        }
      }
    })
  })

  beforeEach(() => {
    wrapper = mount(Display, {
      store
    })
  })

  test('Display correct expression', () => {
    const expression = '1 + 2 + 3 / 4'
    const expressionDisplayEl = wrapper.find('#expression')

    expect(expressionDisplayEl.text()).toBe(expression)
  })

  test('Display correct result', () => {
    const result = 27
    const resultDisplayEl = wrapper.find('#result')

    expect(resultDisplayEl.text()).toBe(`= ${result}`)
  })
})
