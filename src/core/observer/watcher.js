import Dep from './dep';

class Watcher {
  constructor(vm, exprOrFn, callback, options) {
    this.vm = vm;
    this.callback = callback;
    this.options = options;
    this.depIds = new Set();

    this.getter = exprOrFn;
    this.get();
  }
  get () {
    Dep.target = this;
    this.getter();
    Dep.target = null;
  }

  addDep (dep) {
    if (!this.depIds.has(dep.id)) {
      dep.addSub(this);
      this.depIds.add(dep.id);
    }
  }

  update () {
    this.getter.call(vm);
    // this.vm._update();
  }
}

export default Watcher