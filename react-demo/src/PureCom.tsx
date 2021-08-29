import React from 'react';
import { useState } from 'react';
import Feed from './Feed';
import logger from './logger';
import { createItem } from './util';

function PureCom() {
  const [maxLength, setMaxLength] = useState(30000);
  const [list, setList] = useState<any[]>([]);
  const [targetId, setTargetId] = useState(10);

  const logTime = (sign: string, noUse?: any) => {
    logger(sign);
  }

  const run = () => {
    const _list = [];
    for (let i = 0; i < maxLength; i++) {
      _list.push(createItem());
    }
    setList(_list);
  }

  const unshift = () => {
    list.unshift(createItem());
    setList([...list]);
  }

  const push = () => {
    list.push(createItem());
    setList([...list]);
  }

  const shift = () => {
    list.shift();
    setList([...list]);
  }

  const pop = () => {
    list.pop();
    setList([...list]);
  }

  const move = () => {
    const index = list.findIndex(item => item.id === targetId);
    const [item] = list.splice(index, 1);
    list.unshift(item);
    setList([...list]);
  }

  const change = () => {
    const index = list.findIndex(item => item.id === targetId);
    const item = createItem();
    list.splice(index, 1, item);
    setList([...list]);
  }

  // 测试 useLayoutEffect useEffect
  // useLayoutEffect(() => {
  //   longTask();
  // });

  // useEffect(() => {
  //   longTask();
  // });

  return (
    <>
      <h2>PureComponent</h2>
      <div className="action-bar">
        <input type="text" value={maxLength} onChange={(e) => setMaxLength(parseInt(e.target.value))} />
        <button onClick={() => logTime('run', run())}>run</button> &nbsp;&nbsp;&nbsp;&nbsp;
        <button onClick={() => logTime('unshift', unshift())}>unshift</button>
        <button onClick={() => logTime('push', push())}>push</button>
        <button onClick={() => logTime('shift', shift())}>shift</button>
        <button onClick={() => logTime('pop', pop())}>pop</button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <input type="text" value={targetId} onChange={(e) => setTargetId(+e.target.value)} />
        <button onClick={() => logTime('move', move())} disabled={!targetId}>move</button>
        <button onClick={() => logTime('change', change())} disabled={!targetId}>change</button>
      </div>

      <div>
        {
          list.map((item) => {
            return <div className="item-block" key={item.id}>
              <Feed item={item} />
            </div>;
          })
        }
      </div>
    </>
  );
}

export default PureCom;
