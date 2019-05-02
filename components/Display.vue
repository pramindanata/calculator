<template>
  <div class="text-xs-right">
    <div id="expression" :class="expressionClasses">{{ expression || 0 }}</div>
    <div id="result" :class="resultClasses">= {{ result }}</div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

const { mapGetters, mapState } = createNamespacedHelpers('calculator')

export default {
  computed: {
    expressionClasses: function() {
      return {
        'mb-1': true,
        'display-transition': true,
        headline: !this.done,
        subheading: this.done
      }
    },
    resultClasses: function() {
      return {
        'display-transition': true,
        headline: this.done,
        subheading: !this.done
      }
    },
    ...mapGetters(['expression', 'result']),
    ...mapState(['done'])
  }
}
</script>

<style scoped>
.display-transition {
  transition: 0.2s;
}
</style>
