
export default function (sign: string) {
  const startTime = Date.now();
  let scriptTime: number;

  Promise.resolve().then(promiseFn);

  setTimeout(timeoutFn);

  function promiseFn() {
    scriptTime = Date.now() - startTime;
    console.log(`${sign}[script]: ${scriptTime}ms`);
    longTask();
  }

  function timeoutFn() {
    const nowTime = Date.now();
    const totalTime = nowTime - startTime;
    const renderTime = totalTime - scriptTime;
    console.log(`${sign}[render]: ${renderTime}ms`);
    console.log(`${sign}[total]: ${totalTime}ms`);
    longTask();
  }
}

// 将length调大，方便在 chrome performance 找到函数调用，执行时长过短的函数会被自动过滤
function longTask(length = 1) {
  for (let i = 0, num = 0; i < length; i++) {
    num = i * i * i;
  }
}