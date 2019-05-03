<template>
  <v-btn :class="classObject" large block depressed>{{ value }}</v-btn>
</template>

<script>
import { isOperator } from '~/utils'

export default {
  props: {
    value: {
      type: [String, Number],
      required: true
    }
  },
  computed: {
    classObject() {
      return {
        token: true,
        'primary--text': isOperator(this.value)
      }
    }
  }
}
</script>
