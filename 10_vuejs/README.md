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

## transitions
Vue provides the `<transition></transition>` tag to allow transition effects to be aded to html elements with condition rendering. It does this by analyzing which tags have conditional rendering and applies the necessary classes and css to at the required times to activate the animations.

In particular vue.js adds a number of classes at the different stages of the transition, these are
```
v-enter         (starting enter state)
v-enter-active  (active state when entering)
v-enter-to      (only 2.1.8+)
v-leave         (starting leave state)
v-leave-active  (active state when leaving)
v-leave-to      (only 2.1.8+)
```
we can then access these states by applying css transitions to the relevant classes
```html
<div id="demo">
  <button v-on:click="show = !show">
    Toggle
  </button>
  <transition name="fade">
    <p v-if="show">hello</p>
  </transition>
</div>
```
```javascript
new Vue({
  el: '#demo',
  data: {
    show: true
  }
})
```
```css
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0
}
```
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
The default setting of vue-router is to use hashes in the url to identify page changes. If we do not want to use hashes then we need to enable html5 history mode.
```javascript
const router = new VueRouter({
  mode:"history",
  routes: [...]
})
```
However since we are using client-side routing, if a user now directly accesses a child url without first loading the main app, then they will get a 404 error.

We can get around this by redirecting the user to the homepage using server-side routing if the requested url does not match any of our html pages.
e.g. using node.js
```javascript
const http = require('http')
const fs = require('fs')
const httpPort = 80

http.createServer((req, res) => {
  fs.readFile('index.htm', 'utf-8', (err, content) => {
    if (err) {
      console.log('We cannot open "index.htm" file.')
    }

    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8'
    })

    res.end(content)
  })
}).listen(httpPort, () => {
  console.log('Server listening on: http://localhost:%s', httpPort)
})
```

### Navigation Guards
Navigation guards let us specify computation that is done before a route is accessed, e.g. checking whether a user is authenticated or not for premium routes etc. We can use guards globally for all routes, or for specific routes

a global guard can be used using the `router.beforeEach` method which takes a function as an argument:
```javascript
router.beforeEach(function(to,from,next){

})
```
`to` and `from` are the to and from route objects, next is a function that determines the behavior after the guard. We can use
```javascript
next() //move to next guard/hook/url
next(false) //abort navigation request
next('/')
next({path:'/'}) // navigate to different url
```
we can also use `router.afterEach(to,from)` to perform computation after all routes

For specific routes we can pass the navigation guard when defining the routes and passing them to the router using the `beforeEnter` attribute of that route.
```javascript
const router = new VueRouter({
  routes : [
    {
      path:'/foo',
      component:Foo,
      beforeEnter: (to,from,next) => {

      }
    }
  ]
})
```

we can also define navigation guards as attributes of components
```javascript
const Foo = {
  template: `...`,
  beforeRouteEnter (to, from, next) {
    // called before the route that renders this component is confirmed.
    // does NOT have access to `this` component instance,
    // because it has not been created yet when this guard is called!
  },
  beforeRouteUpdate (to, from, next) {
    // called when the route that renders this component has changed,
    // but this component is reused in the new route.
    // For example, for a route with dynamic params `/foo/:id`, when we
    // navigate between `/foo/1` and `/foo/2`, the same `Foo` component instance
    // will be reused, and this hook will be called when that happens.
    // has access to `this` component instance.
  },
  beforeRouteLeave (to, from, next) {
    // called when the route that renders this component is about to
    // be navigated away from.
    // has access to `this` component instance.
  }
}
```
a common pattern is to ask a user whether they are certain they want to leave a page:
```javascript
beforeRouteLeave (to, from , next) {
  const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
  if (answer) {
    next()
  } else {
    next(false)
  }
}
```
### Route Meta Fields
We can include metadata when constructing route objects using the `meta` attribut and specifying a javascript object, e.g.
```javascript
const router = new VueRouter({
  routes : [
    {
      path: "/foo",
      component: Foo,
      meta: {requiresAuth: true}
    }
  ]
})
```
we can then access the meta field e.g. in a navigation guard. Additionally route objects have the `matched` attribute, which is an array of all routes matched by the current route url, e.g. `/user/foo` will match `/user/foo` and `/user`. We can use this to check all the metadata of all matched routes.
```javascript
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!auth.loggedIn()) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})
```
### Transitions

### Fetching Data
