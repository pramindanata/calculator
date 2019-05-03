/* eslint-disable no-console */
import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import { mount } from '@vue/test-utils'
import Control from '~/components/Control'

const wrapControl = done => {
  return mount(Control, {
    computed: { done: () => done }
  })
}

describe('Components: Control.vue', () => {
  beforeAll(() => {
    Vue.use(Vuetify)
    Vue.use(Vuex)
  })

  test('Token button call pushToExpression mutation on click', () => {
    const wrapper = wrapControl(false)
    const tokenButton = wrapper.find('.v-btn.token')
    wrapper.vm.pushToExpression = jest.fn()

    tokenButton.trigger('click')
    expect(wrapper.vm.pushToExpression).toBeCalled()
  })

  test('Token button call continueCalculation action too on click when done is true', () => {
    const wrapper = wrapControl(true)
    const tokenButton = wrapper.find('.v-btn.token')
    wrapper.vm.pushToExpression = jest.fn()
    wrapper.vm.continueCalculation = jest.fn()

    tokenButton.trigger('click')
    expect(wrapper.vm.continueCalculation).toBeCalled()
    expect(wrapper.vm.pushToExpression).toBeCalled()
  })

  test('Delete button call popItem mutation if done is false', () => {
    const wrapper = wrapControl(false)
    const deleteButton = wrapper.find('#control-delete')
    wrapper.vm.popItem = jest.fn()

    deleteButton.trigger('click')
    expect(wrapper.vm.popItem).toBeCalled()
  })

  test('Delete button doest not call popItem mutation if done is true', () => {
    const wrapper = wrapControl(true)
    const deleteButton = wrapper.find('#control-delete')
    wrapper.vm.popItem = jest.fn()

    deleteButton.trigger('click')
    expect(wrapper.vm.popItem).not.toBeCalled()
  })

  test('Reset button call reset mutation', () => {
    const wrapper = wrapControl(true)
    const resetButton = wrapper.find('#control-reset')
    wrapper.setMethods({
      reset: jest.fn()
    })

    resetButton.trigger('click')
    expect(wrapper.vm.reset).toBeCalled()
  })

  test('Finish button does call finish mutation', () => {
    const wrapper = wrapControl(true)
    const finishButton = wrapper.find('#control-finish')
    wrapper.setMethods({
      finish: jest.fn()
    })

    finishButton.trigger('click')
    expect(wrapper.vm.finish).toBeCalled()
  })
})
