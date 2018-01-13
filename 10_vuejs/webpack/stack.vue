<template>
<div>
  <button v-on:click="add">add to list</button>
  <p v-for="child in children">
    aaaaa
  </p>
</div>
</template>

<script>
var arr = []
export default {
  name:"stack",
  methods:{
    add : function(){
      this.children.push(1)
      console.log(this.children)
    }
  },
  created () {
    this.children = arr
  }
}
</script>
