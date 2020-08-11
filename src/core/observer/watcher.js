import Dep, { pushTarget, popTarget } from './dep';
import { parsePath } from '../util/index'
import { queueWatcher } from './scheduler'

let uid = 0

class Watcher {
  constructor(vm, exprOrFn, callback, options) {
    this.vm = vm;
    this.callback = callback;
    this.options = options;
    this.deps = [];
    this.depIds = new Set();
    this.id = ++uid;

    if (options) {
      this.before = options.before;
    }

    if (typeof exprOrFn === 'function') {
      this.getter = exprOrFn
    } else {
      this.getter = parsePath(exprOrFn)
    }

    this.value = this.get();
  }
  get () {
    Dep.target = this;
    let value = '';
    try {
      value = this.getter.call(this.vm, this.vm);
    } catch (e) {

    } finally {
      Dep.target = null;
    }
    return value;
  }

  addDep (dep) {
    if (!this.depIds.has(dep.id)) {
      dep.addSub(this);
      this.depIds.add(dep.id);
      this.deps.push(dep);
    }
  }

  run () {
    let value = this.get();
    if (value !== this.value) {
      let oldValue = this.value;
      this.value = value;
      this.callback.call(this.vm, this.value, oldValue);
    }
  }

  update () {
    queueWatcher(this);
  }

  teardown () {
    let i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
  }
}

export default Watcher