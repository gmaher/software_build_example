console.log('hello world');

var title = document.createElement('h1');
title.textContent = "I was made with javascript!";
document.body.appendChild(title);

function myAlert(){
  alert("you clicked me!");
}

title.addEventListener('click',myAlert);

//Note finds the first element with link id
var link = document.querySelector('#link');
//Now changing the properties of the link element
//immediately changes them on the page
link.textContent = 'mozilla developer network';
link.href = 'https://developer.mozilla.org';

var text = document.createTextNode('added some text yo');
link.appendChild(text);

function add_p(){
  var header = document.querySelector('h1')
  var p = document.createElement('p');
  p.textContent = 'just added me';
  header.appendChild(p);
}

function remove_p(){
  var header = document.querySelector('h1')
  var p = header.querySelector('p')
  header.removeChild(p);
}

function change_color(){
  header = document.querySelector("h1");
  input  = document.querySelector("input");
  var color = input.value;
  var children = Array.prototype.slice.call(header.childNodes);
  console.log(children);
  for (k in children){
    if (typeof children[k].style === 'undefined') continue;
    children[k].style.color = color;
  }
}

var highlight_ = false;
function highlight(){
  highlight_ = !highlight_;
  header = document.querySelector("h1");
  var children = Array.prototype.slice.call(header.childNodes);

  for (k in children){
    if (typeof children[k].style === 'undefined') continue;
    if (highlight_){
      children[k].setAttribute('class','highlight');
    }
    else{
      children[k].setAttribute('class','');
    }

  }
}
