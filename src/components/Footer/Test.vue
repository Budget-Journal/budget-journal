<template>
  <div id="interaction-observer">
    <div>
      <li v-for="log in logs" class="interactionLogLine ">
        {{ log.eventName }} interaction was observed!

        <div class="interaction-log-info">
          <event-click v-if="log.eventName === 'Click'" display-all-info @delete-action="onDelete(log)" :event="log.event" />
          <event-move v-if="log.eventName === 'Move'" display-all-info @delete-action="onDelete(log)" :event="log.move" />
          <event-info-scroll v-if="log.eventName === 'Scroll'" display-all-info @delete-action="onDelete(log)" :event="log.scroll" />
          <event-input v-if="log.eventName === 'Input'" display-all-info @delete-action="onDelete(log)" :event="log.input" />
        </div>
      </li>
    </div>
  </div>
</template>

<script>
import { eventClick, eventMove, eventInfoScroll, eventInput } from './components'
export default {
  name: 'interaction-observer',
  components: {
    eventClick,
    eventMove,
    eventInfoScroll,
    eventInput
  },
  props: {
    active: {
      default: true
    }
  },
  data () {
    return {
      logs: []
    }
  },
  mounted () {
    if (this.active) this.start()
  },
  watch: {
    logs (value) {
      this.$emit('interaction', value.pop())
    }
  },
  methods: {
    start () {
      // Listen to clicks
      document.addEventListener('click', event => {
        this.logs.push({
          eventName: 'Click',
          event
        })
      })
      // Listen to moves
      document.addEventListener('move', event => {
        this.logs.push({
          eventName: 'Move',
          event
        })
      })
      // Listen to moves
      document.addEventListener('scroll', event => {
        this.logs.push({
          eventName: 'Scroll',
          event
        })
      })
      // Listen to inputs
      document.addEventListener('input', event => {
        this.logs.push({
          eventName: 'Input',
          event
        })
      })
    },
    onDelete (log) {
      this.logs.splice(this.logs.indexOf(log), 1)
    }
  }
}
</script> 