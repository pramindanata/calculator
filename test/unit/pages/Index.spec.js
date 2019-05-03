import Vue from 'vue'
import Vuetify from 'vuetify'
import { shallowMount } from '@vue/test-utils'
import Index from '~/pages/index'
import Control from '~/components/Control'
import Display from '~/components/Display'

describe('Page: Index.vue', () => {
  beforeAll(() => {
    Vue.use(Vuetify)
  })

  test('Control and display component are exist', () => {
    const wrapper = shallowMount(Index)

    expect(wrapper.contains(Control)).toBeTruthy()
    expect(wrapper.contains(Display)).toBeTruthy()
  })
})
