var phrases = require('./phrases.js')
function say_something(){
  console.log(phrases.hello);
}

function say_deluxe(){
  console.log(phrases.hello + " The deluxe version")
}

module.exports = {
  say_something:say_something,
  say_deluxe:say_deluxe
};
