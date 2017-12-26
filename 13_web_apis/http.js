
var requestURL = 'https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json';

var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
  console.log(request);
  console.log(request.response);
}

function get_file(){
  input = document.querySelector("#file_input")
  file  = input.value
  console.log(file);
  var fileFetch = fetch(file)

  var f = fileFetch.then(function(response){
    return response.text()
  });

  f = f.then(function(text){
    console.log(text);
    var p = document.querySelector('p')
    p.textContent = text;
  })
}
