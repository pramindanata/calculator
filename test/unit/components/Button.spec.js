import Vue from 'vue'
import Vuetify from 'vuetify'
import { mount } from '@vue/test-utils'
import Button from '~/components/Button'

describe('Components: Button.vue', () => {
  beforeAll(() => {
    Vue.use(Vuetify)
  })

  test('Append correct value to the button', () => {
    const wrapper = mount(Button, {
      propsData: { value: 4 }
    })

    expect(wrapper.find('.v-btn > div').text()).toBe('4')
  })

  test('Operator button has "primary--text" class', () => {
    const operators = ['=', '%', '/', '*', '-', '+']
    const mountButton = operator => {
      const wrapper = mount(Button, {
        propsData: {
          value: operator
        }
      })
      const button = wrapper.find('button')

      expect(button.classes()).toContain('primary--text')
    }

    operators.map(operator => mountButton(operator))
  })

  test('Non operator button does not have "primary--text" class', () => {
    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    const mountButton = number => {
      const wrapper = mount(Button, {
        propsData: {
          value: number
        }
      })
      const button = wrapper.find('button')

      expect(button.classes()).not.toContain('primary--text')
    }

    numbers.map(number => mountButton(number))
  })

  test('It has "token" class', () => {
    const wrapper = mount(Button, {
      propsData: {
        value: 1
      }
    })

    expect(wrapper.classes()).toContain('token')
  })
})
