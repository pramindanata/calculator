<template>
  <v-app>
    <app-toolbar></app-toolbar>

    <v-content>
      <v-container class="page">
        <nuxt />
      </v-container>
    </v-content>

    <app-footer></app-footer>
  </v-app>
</template>

<script>
import AppFooter from '~/components/Footer.vue'
import AppToolbar from '~/components/Toolbar.vue'

export default {
  components: {
    AppFooter,
    AppToolbar
  }
}
</script>
