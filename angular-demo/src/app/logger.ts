import { Observable } from 'rxjs';

export default function (sign: string) {
  const time = performance.now();

  Promise.resolve().then(promiseFn);

  setTimeout(timeoutFn);

  function promiseFn() {
    const diff = (performance.now() - time);
    console.log(`${sign}[framework]: ${diff}ms`);
    longTask();
  }

  function timeoutFn() {
    const diff = (performance.now() - time);
    console.log(`${sign}[total]: ${diff}ms`);
    longTask();
  }
}

// 将length调大，方便在 chrome performance 找到函数调用，执行时长过短的函数会被自动过滤
function longTask(length = 1) {
  for (let i = 0, num = 0; i < length; i++) {
    num = i * i * i;
  }
}