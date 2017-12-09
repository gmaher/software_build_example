var app = new Vue({
  el: '#message',
  data: {
    statement:"eyyyyyy"
  }
})

var people_app = new Vue({
  el:"#people_list",
  data:{
    people:[
      {text:"bob"},
      {text:"harry"},
      {text:"michael"}
    ]
  }
})

var counter_app = new Vue({
  el:"#counter",
  data:{
    count:0
  },
  methods: {
    increment:function(){
    this.count += 1;
    }
  }
})

var input_app = new Vue({
  el:"#input",
  data: {
    input_message:"type me!"
  }
})

Vue.component('record-item',{
  props:['record'],
  template:'<li>{{record.text}}, {{record.count}}</li>'
})

var record_app = new Vue({
  el:"#records",
  data: {
    recordList:[
      {text:'blah',count:0},
      {text:'huurrr',count:1000},
      {text:"Hi Gabe! ^^",count:-20}
    ]
  }
})

var v = new Vue({
  data:{
    a:1
  },
  created: function () {
    console.log('a is: '+this.a)
  }
})

var raw_app = new Vue({
  el:"#raw_app",
  data:{
    raw:'<span style="color:red">This should be red</span>',
    dynamic_id:"id1"
  }
})

var compue_app = new Vue({
  el:"#computed",
  data:{
    first:"aaa"
  },
  computed:{
    second: function(){
      return this.first+"bbbb";
    },
    url: function(){
      return "www.google.com/"+this.first
    }
  }
})

var watcher_app = new Vue({
  el:"#watcher",
  data:{question:'',
  answer:"no answer"
  },
  watch: {
    question: function(newQuestion){
      this.answer = "answering"
      this.getAnswer()
    }
  },
  methods: {
    getAnswer: function(){
      var vm = this;
      vm.answer = "anwered"
    }
  }
})

var shadow_app = new Vue({
  el:"#shadow_app",
  data:{
    isshadow:false,
    isspinning:true,
    styleObject:{
      color:"purple",
      fontSize:"30px"
    }
  },
  computed: {
    classObject: function(){
      return {'spinningon':this.isspinning, 'shadowon':this.isshadow}
    }
  },
  methods:{
    toggle_shadow:function(){
      this.isshadow = !this.isshadow
    }
  }
})

var event_app = new Vue({
  el:"#event_app",
  data:{
    name:"This is my name"
  },
  methods:{
    greet: function(event){
      alert("Hello " + this.name + "! " + event)

    }
  }
})

var checkbox_app = new Vue({
  el:"#checklist_app",
  data:{
    checkArray: []
  }
})

new Vue({
  el:"#select",
  data:{
    select:""
  }
})
