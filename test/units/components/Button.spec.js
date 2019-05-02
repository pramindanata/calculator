import Vue from 'vue'
import Vuetify from 'vuetify'
import { mount } from '@vue/test-utils'
import Button from '~/components/Button'

describe('Components: Button.vue', () => {
  beforeAll(() => {
    Vue.use(Vuetify)
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
    const operators = [1, 2, 'a']
    const mountButton = operator => {
      const wrapper = mount(Button, {
        propsData: {
          value: operator
        }
      })
      const button = wrapper.find('button')

      expect(button.classes()).not.toContain('primary--text')
    }

    operators.map(operator => mountButton(operator))
  })
})
