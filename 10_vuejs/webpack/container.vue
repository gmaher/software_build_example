<template>
<div>
  <phrase v-bind:style="styleObject" v-bind:phrase="from container"></phrase>
</div>
</template>

<script>
import phrase from './phrase.vue';

export default {
  props:['styleObject'],
  components: { phrase }
}
</script>
