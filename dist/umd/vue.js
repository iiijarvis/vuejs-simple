(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.Vue = factory());
}(this, (function () { 'use strict';

  function Vue() {
    console.log('vue start');
  }

  return Vue;

})));
//# sourceMappingURL=vue.js.map
