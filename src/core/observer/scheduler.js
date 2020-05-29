let has = {};
let flushing = false;
let queue = [];
let index = 0;
let waiting = false;

export function queueWatcher (watcher) {
  let id = watcher.id;
  if (!has[id]) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // 执行 flushSchedulerQueue 过程中插入 watcher
      let i = queue.length - 1;
      // 按从小到大排列 插入id
      while (i > index && queue[index].id > id) i--;
      queue.splice(i + 1, 0, watcher);
    }
    if (!waiting) {
      waiting = true;
      setTimeout(flushSchedulerQueue, 0);
    }
  }
}

function flushSchedulerQueue () {
  flushing = true;
  queue.sort((a, b) => a.id - b.id);
  for (index = 0; index < queue.length; index++) {
    let watcher = queue[index];
    has[watcher.id] = null;
    watcher.run();
  }
  index = queue.length = 0;
  has = {};
  flushing = waiting = false;
}
