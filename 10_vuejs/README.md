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

## Routing with Vue.js

We can use Vue.js with 3rd party routers or with its own router `vue-router`. Vue-router is a javascript library that we can install with npm, or we can include the script manually.

The simplest way to use `vue-router` is to map routes directly to components and then pass those routes the `VueRouter` object during instantiation:
```javascript
//Foo and Bar are components with a defined template
const routes = [
  {path:"/foo", component:Foo},
  {path:"/bar", component:Bar}
]
const router = new VueRouter({
  routes
})
const app = new Vue({
  router
}).$mount("#app")
```
We can then refer to the route in html using the `router-link` tag:
```html
<router-link to="/foo">go to foo</router-link>
```
By passing the router as a constructor argument, we can then access it in any of the components we create using `this.$router` and the current route as `this.$route`, e.g.
```javascript
export default {
  computed: {
    username () {
      return this.$route.params.username
    }
  }
  methods: {
    goback() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    }
  }
}
```

we can use dynamic routes using a path with a `:`, e.g. `/user/:id`, then id will appear in the `this.$route.params.id` tag. Note that when params change, the component is not recreated, only parameters are updated. To force updates we can watch the `$route` object.

### Nested routes
We can create different view for different nested routes e.g. `/user/profile` and `/user/posts`. We do this using the `<router-view></router-view>` tag. The way nesting is achieved is through using the router-view tag within a component that is already at the position of router-view tag. We additionally need to pass the nested route as an element of the `children` array of the route object for that path, e.g.
```javascript
const routes = [
  {path:"/user/:id", component:User,
    children:[{path:"profile", component:Profile},
      {path:"posts", component:Posts}]
  }
]
```
we can also use a catch-all subroute:
```javascript
{path:"",component:Home}
```

### programatic navigation
we can use the `router` object to do programmatic navigation. `router.push({name:'user',params:{userID:123}})` or `router.push({path:'user/123'})`

Forward and backward navigation can be achieved with `router.go(n)`

### Named views
Named views let us associate names with particular router-view tags, allowing us to use multiple views without nesting. Without a name the router-view is given the name `default` e.g.
```html
<router-view></router-view>
<router-view name="a"></router-view>
<router-view name="b"></router-view>
```
```javascript
const router = new VueRouter({
  routes : [
    {
      path: '/',
      components: {
        default:Foo,
        a: Bar,
        b: Baz
      }
    }
  ]
})
```

### Passing props via routes
Using the `$route` variable to get to the route parameters in a component means that that component can only be used with that specific route. We can instead pass the route params via the `props` of the component, meaning that we can also use the component in other ways, e.g. directly instantiating it and passing to the props. e.g.
```javascript
const User = {
  props: ['id'],
  template: '<div>User {{ id }}</div>'
}
const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User, props: true }

    // for routes with named views, you have to define the `props` option for each named view:
    {
      path: '/user/:id',
      components: { default: User, sidebar: Sidebar },
      props: { default: true, sidebar: false }
    }
  ]
})
```
We can also use functions to return the props as an object
```javascript
const router = new VueRouter({
  routes: [
    { path: '/search', component: SearchUser, props: (route) => ({ query: route.query.q }) }
  ]
})
```
e.g. we can now use the url `/search?q=Vue`

### History mode

### Navigation Guards

### Route Meta Fields

### Transitions

### Fetching Data
