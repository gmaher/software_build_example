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

// Vue.component('blog_post', {
//   props: ['post'],
//   template: "<div><h2>{{post.title}}</h2>\
//               <h3>{{post.author}}</h3> \
//               <p>{{post.content}}</p></div>"
// })

Vue.component('blog', {
  props: ['blog_title','posts'],
  template: "<div><div><h1>{{blog_title}}</h1></div>\
  <p>{{posts}}</p>\
  </div></div>"
})

var app = new Vue({
  el:"#app",
  data:{
    "blog_posts":blog_posts
  }
})
