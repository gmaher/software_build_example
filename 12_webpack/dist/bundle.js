 (function(modules) { // webpackBootstrap
   	var installedModules = {};
   	function __webpack_require__(moduleId) {
   		if(installedModules[moduleId]) {
   			return installedModules[moduleId].exports;
   		}
   		var module = installedModules[moduleId] = {
   			i: moduleId,
   			l: false,
   			exports: {}
   		};
   		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
   		module.l = true;
   		return module.exports;
   	}
   	__webpack_require__.m = modules;
   	__webpack_require__.c = installedModules;
   	__webpack_require__.d = function(exports, name, getter) {
   		if(!__webpack_require__.o(exports, name)) {
   			Object.defineProperty(exports, name, {
   				configurable: false,
   				enumerable: true,
   				get: getter
   			});
   		}
   	};
   	__webpack_require__.n = function(module) {
   		var getter = module && module.__esModule ?
   			function getDefault() { return module['default']; } :
   			function getModuleExports() { return module; };
   		__webpack_require__.d(getter, 'a', getter);
   		return getter;
   	};
   	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
   	__webpack_require__.p = "";
   	return __webpack_require__(__webpack_require__.s = 0);
 })

 ([
/***/ (function(module, exports, __webpack_require__) {
var say = __webpack_require__(1)
function make_a_statement(){
  say.say_something();
  say.say_deluxe();
}
/***/ }),
/***/ (function(module, exports, __webpack_require__) {
var phrases = __webpack_require__(2)
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
/***/ }),
/***/ (function(module, exports) {
module.exports = {
  "hello":"Hello world!"
}
/***/ })
 ]);
