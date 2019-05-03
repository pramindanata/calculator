<template>
  <v-container fluid grid-list-lg class="pa-3">
    <v-layout column>
      <v-flex>
        <v-layout row>
          <v-flex xs3>
            <v-btn
              id="control-reset"
              large
              block
              depressed
              class="error--text"
              @click="reset"
            >
              C
            </v-btn>
          </v-flex>

          <v-flex xs3>
            <v-btn
              id="control-delete"
              large
              block
              depressed
              @click="removeLastValue"
            >
              <v-icon>backspace</v-icon>
            </v-btn>
          </v-flex>

          <v-flex xs3>
            <control-button value="%" @click.native="insert('%')" />
          </v-flex>

          <v-flex xs3>
            <control-button value="/" @click.native="insert('/')" />
          </v-flex>
        </v-layout>
      </v-flex>

      <template v-for="(row, keyRow) in controls">
        <v-flex :key="keyRow">
          <v-layout row>
            <v-flex v-for="(control, keyControl) in row" :key="keyControl" xs3>
              <control-button
                :value="control.value"
                @click.native="insert(control.value)"
              />
            </v-flex>
          </v-layout>
        </v-flex>
      </template>

      <v-flex>
        <v-layout row>
          <v-flex xs6>
            <control-button value="0" @click.native="insert(0)" />
          </v-flex>

          <v-flex xs6>
            <v-btn
              id="control-finish"
              class="primary--text"
              large
              block
              depressed
              @click="finish"
              >=</v-btn
            >
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import ControlButton from '~/components/Button.vue'

const { mapActions, mapMutations, mapState } = createNamespacedHelpers(
  'calculator'
)

export default {
  components: {
    ControlButton
  },
  data: () => ({
    controls: [
      [
        {
          type: 'number',
          value: 7
        },
        {
          type: 'number',
          value: 8
        },
        {
          type: 'number',
          value: 9
        },
        {
          type: 'operator',
          value: '*'
        }
      ],
      [
        {
          type: 'number',
          value: 4
        },
        {
          type: 'number',
          value: 5
        },
        {
          type: 'number',
          value: 6
        },
        {
          type: 'operator',
          value: '-'
        }
      ],
      [
        {
          type: 'number',
          value: 1
        },
        {
          type: 'number',
          value: 2
        },
        {
          type: 'number',
          value: 3
        },
        {
          type: 'operator',
          value: '+'
        }
      ]
    ]
  }),
  computed: {
    ...mapState(['done'])
  },
  methods: {
    insert(value) {
      if (this.done) {
        this.continueCalculation()
      }

      this.pushToExpression(value)
    },
    removeLastValue() {
      if (!this.done) {
        this.popItem()
      }
    },
    ...mapActions(['continueCalculation']),
    ...mapMutations(['finish', 'pushToExpression', 'popItem', 'reset'])
  }
}
</script>
