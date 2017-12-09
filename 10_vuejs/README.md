## Vue.js

Vue.js is a javascript library that makes it easier to build dynamic websites. Vue.js let us update the html of websites with values from javascript variables.

## Components

We can create components, similar to existing html components, in javascript using Vue.js. Components consists of `props` which denote their properties and a `template` that dictates how the component should be rendered. We set the `props` tag of a component by using the `v-bind:prop_name` tag on the component. For example:
```javascript
Vue.component('example_component',{
  props:['record'],
  template:"<p>{{record.text}}, {{record.name}}</p>"
})
```
```html
<example_component v-bind:record="{text:'hello',name:'bob'}"></example_component>
```

We can also specify props as an object
```javascript
Vue.component('component_2',{
  props:{
    first_prop: Number,
    second_prop: [String, Number],
    third_prop:{type:Number, default:100}
  }
})
```

## forms and inputs

We can use directly reference an array in an input tag with `v-model` and it will
know to populate the correct array.
