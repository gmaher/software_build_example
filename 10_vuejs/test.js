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
      {text:"argh",count:-20}
    ]
  }
})
