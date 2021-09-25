const dataInfo = {} as any;

export default function (sign: string) {
  if(!dataInfo[sign]){
    dataInfo[sign] = [];
  }

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
    dataInfo[sign].push({renderTime, scriptTime, totalTime});
  }
}

// 将length调大，方便在 chrome performance 找到函数调用，执行时长过短的函数会被自动过滤
function longTask(length = 1) {
  for (let i = 0, num = 0; i < length; i++) {
    num = i * i * i;
  }
}

export function showStat(){
  Object.keys(dataInfo).forEach((sign) => {
    console.log(`${sign} stat : `);
    console.table(dataInfo[sign]);
    const total = dataInfo[sign].reduce((pre: any, curr: any) => {
      Object.keys(curr).forEach((key) => {
        pre[key] = curr[key] + (pre[key] || 0);
      });
      return pre;
    },{});
    
    const avg = {...total};

    Object.keys(avg).forEach((key) => {
      avg[key] = avg[key] / dataInfo[sign].length;
    });

    console.log(`${sign} avg : `);
    console.table([avg]);
  })
}