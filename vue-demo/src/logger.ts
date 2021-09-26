const dataInfo = {} as any;

export default function (trackId: string) {
  if(!dataInfo[trackId]){
    dataInfo[trackId] = [];
  }

  const startTime = Date.now();
  let scriptTime: number;

  Promise.resolve().then(() => {
    Promise.resolve().then(promiseFn)
  });

  setTimeout(timeoutFn);

  function promiseFn() {
    scriptTime = Date.now() - startTime;
    console.log(`${trackId}[script]: ${scriptTime}ms`);
    longTask();
  }

  function timeoutFn() {
    const nowTime = Date.now();
    const totalTime = nowTime - startTime;
    const renderTime = totalTime - scriptTime;
    console.log(`${trackId}[render]: ${renderTime}ms`);
    console.log(`${trackId}[total]: ${totalTime}ms`);
    longTask();
    dataInfo[trackId].push({renderTime, scriptTime, totalTime});
  }
}

// 将length调大，方便在 chrome performance 找到函数调用，执行时长过短的函数会被自动过滤
function longTask(length = 1) {
  for (let i = 0, num = 0; i < length; i++) {
    num = i * i * i;
  }
}


export function showStat(){
  Object.keys(dataInfo).forEach((trackId) => {
    console.log(`${trackId} stat : `);
    console.table(dataInfo[trackId]);
    const total = dataInfo[trackId].reduce((pre: any, curr: any) => {
      Object.keys(curr).forEach((key) => {
        pre[key] = curr[key] + (pre[key] || 0);
      });
      return pre;
    },{});
    
    const avg = {...total};

    Object.keys(avg).forEach((key) => {
      avg[key] = avg[key] / dataInfo[trackId].length;
    });

    console.log(`${trackId} avg : `);
    console.table([avg]);
  })
}