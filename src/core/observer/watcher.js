import Dep, { pushTarget, popTarget } from './dep';
import { parsePath } from '../util/index'
import { queueWatcher } from './scheduler'

let uid = 0

class Watcher {
  constructor(vm, exprOrFn, callback, options) {
    this.vm = vm;
    this.callback = callback;
    this.options = options;
    this.depIds = new Set();
    this.id = ++uid;

    if (typeof exprOrFn === 'function') {
      this.getter = exprOrFn
    } else {
      this.getter = parsePath(exprOrFn)
    }

    this.value = this.get();
  }
  get () {
    pushTarget(this);
    let value = '';
    try {
      value = this.getter.call(this.vm, this.vm);
    } catch (e) {

    } finally {
      popTarget();
    }
    return value;
  }

  addDep (dep) {
    if (!this.depIds.has(dep.id)) {
      dep.addSub(this);
      this.depIds.add(dep.id);
    }
  }

  run () {
    let value = this.getter.call(this.vm, this.vm);
    if (value !== this.value) {
      let oldValue = this.value;
      this.value = value;
      this.callback.call(this.vm, this.value, oldValue);
    }
  }

  update () {
    queueWatcher(this);
  }
}

export default Watcher