blog_posts = [
  {"title":"my first post",
    "content":"This is my first post, I am so excited!",
    "author":"me"},

    {"title":"Yet another blog post",
      "content":"Not done blogging yet",
      "author":"me"},

      {"title":"Post written by somebody else",
        "content":"Time for a different opinion",
        "author":"Someone else"},
]

const blog_post = {
  props: ['id'],
  template: "<div>\
              <h2>{{post.title}}</h2>\
              <h3>{{post.author}}</h3> \
              <p>{{post.content}}</p></div>",
  data: function(){
    return {post:blog_posts[this.id]}
  }
}

const blog =  {
  template: "<div><div><h1>{{blog_title}}</h1></div>\
    <div v-for='(post,index) in posts'>\
      <h2><router-link v-bind:to=\"'/post/'+index\">{{index}}, {{post.title}}</router-link></h2>\
      <h3>{{post.author}}</h3>\
    </div>\
  </div></div>",
  data: function() {
    return {blog_title:"my blog", posts:blog_posts}
  }
}

//create router
const routes = [
  {path:"/",component:blog},
  {path:"/post/:id",component:blog_post, props: true}
]
const router = new VueRouter({
  routes:routes
})

Vue.config.debug = true;

const app = new Vue({
  router:router,
}).$mount('#app')
