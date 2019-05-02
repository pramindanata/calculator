/* eslint-disable no-console */
import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import { mount } from '@vue/test-utils'
import Control from '~/components/Control'

describe('Components: Control.vue', () => {
  beforeAll(() => {
    Vue.use(Vuetify)
    Vue.use(Vuex)
  })

  describe('# Methods', () => {
    describe('## insert()', () => {
      test('Call pushToExpression once', () => {
        const wrapper = mount(Control, {
          computed: {
            done: () => false
          }
        })
        wrapper.vm.pushToExpression = jest.fn()

        wrapper.vm.insert(4)
        expect(wrapper.vm.pushToExpression.mock.calls.length).toBe(1)
        expect(wrapper.vm.pushToExpression.mock.calls[0][0]).toBe(4)
      })

      test('Run continueCalculation() too if calculation did finished', () => {
        const wrapper = mount(Control, {
          computed: {
            done: () => true
          }
        })
        wrapper.vm.pushToExpression = jest.fn()
        wrapper.vm.continueCalculation = jest.fn()

        wrapper.vm.insert(4)
        expect(wrapper.vm.continueCalculation).toBeCalled()
        expect(wrapper.vm.pushToExpression.mock.calls.length).toBe(1)
      })
    })

    describe('## removeLastValue()', () => {
      test('popItem() if done is false', () => {
        const wrapper = mount(Control, {
          computed: {
            done: () => false
          }
        })
        wrapper.vm.popItem = jest.fn()

        wrapper.vm.removeLastValue()
        expect(wrapper.vm.popItem).toBeCalled()
      })

      test('Do not call popItem() if done is true', () => {
        const wrapper = mount(Control, {
          computed: {
            done: () => true
          }
        })
        wrapper.vm.popItem = jest.fn()

        wrapper.vm.removeLastValue()
        expect(wrapper.vm.popItem).not.toBeCalled()
      })
    })
  })
})
