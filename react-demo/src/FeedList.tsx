import React from 'react';
import { useState } from 'react';
import Feed from './Feed';
import logger, { showStat } from './logger';
import { createItem, resetUUID } from './util';

function FeedList() {
  const [maxLength, setMaxLength] = useState(30000);
  const [list, setList] = useState<any[]>([]);
  const [targetId, setTargetId] = useState(10);

  const batchCreate = () => {
    logger('batchCreate');
    const _list = [];
    for (let i = 0; i < maxLength; i++) {
      _list.push(createItem());
    }
    setList(_list);
  }

  const unshift = () => {
    logger('unshift');
    list.unshift(createItem());
    setList([...list]);
  }

  const push = () => {
    logger('push');
    list.push(createItem());
    setList([...list]);
  }

  const shift = () => {
    logger('shift');
    list.shift();
    setList([...list]);
  }

  const pop = () => {
    logger('pop');
    list.pop();
    setList([...list]);
  }

  const moveHead = () => {
    logger('moveHead');
    const index = list.findIndex(item => item.id === targetId);
    const [item] = list.splice(index, 1);
    list.unshift(item);
    setList([...list]);
  }

  const replace = () => {
    logger('replace');
    const index = list.findIndex(item => item.id === targetId);
    const item = createItem();
    list.splice(index, 1, item);
    setList([...list]);
  }

  const del = () => {
    logger('del');
    const index = list.findIndex(item => item.id === targetId);
    list.splice(index, 1);
    setList([...list]);
  }

  const reset = () => {
    logger('reset');
    setList([]);
    resetUUID();
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
      <div className="action-bar">
        <h2>feed list</h2>
        <input type="text" value={maxLength} onChange={(e) => setMaxLength(parseInt(e.target.value))} />
        <button onClick={() => batchCreate()}>batchCreate</button>
        <button onClick={() => reset()}>reset</button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <button onClick={() => unshift()}>unshift</button>
        <button onClick={() => push()}>push</button>
        <button onClick={() => shift()}>shift</button>
        <button onClick={() => pop()}>pop</button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <input type="text" value={targetId} onChange={(e) => setTargetId(+e.target.value)} />
        <button onClick={() => moveHead()} disabled={!targetId}>moveHead</button>
        <button onClick={() => replace()} disabled={!targetId}>replace</button>
        <button onClick={() => del()} disabled={!targetId}>del</button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <button onClick={() => showStat()} disabled={!targetId}>showStat</button>
      </div>

      <div className="container">
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

export default FeedList;
