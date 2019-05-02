<template>
  <v-card>
    <v-card-text>
      <display></display>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions class="pa-0">
      <control></control>
    </v-card-actions>
  </v-card>
</template>

<script>
import Display from '~/components/Display.vue'
import Control from '~/components/Control.vue'

export default {
  components: {
    Display,
    Control
  },
  head: {
    title: 'Calculator'
  }
}
</script>
