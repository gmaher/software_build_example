<template>
<div>
  <button v-on:click="add">add to list</button>
  <p v-for="child in children">
    aaaaa
  </p>
  <p v-for="child in o_children">
    other
  </p>
</div>
</template>

<script>
var arr = []
export default {
  name: 'stack',
  props: ['other_children'],
  data () {
    return {
        o_children: this.other_children
    }
  },
  methods: {
    add: function(){
      this.children.push(1)
      console.log(this.children)
      this.other_children.push(1)
      console.log(this.other_children)
    }
  },
  created () {
    this.children = arr
  }
}
</script>
