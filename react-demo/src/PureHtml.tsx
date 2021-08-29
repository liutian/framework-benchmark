import { useState } from "react";
import logger from "./logger";
import { createItem } from "./util";

function PureHtml() {
  const [list, setList] = useState<any[]>([]);
  const [maxLength, setMaxLength] = useState(30000);
  const [targetId, setTargetId] = useState(10);
  const [, setTick] = useState(0);

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

  const toggle = (item: any) => {
    item.isShowComment = !item.isShowComment;
    setTick((c) => ++c);
  }

  const favorite = (item: any) => {
    item.favorite += 1;
    setTick((c) => ++c);
  }

  const like = (item: any) => {
    item.like += 1;
    setTick((c) => ++c);
  }

  const forward = (item: any) => {
    item.forward += 1;
    setTick((c) => ++c);
  }

  const comment = (item: any) => {
    item.comments.push({
      id: item.id + 10000 + item.comments.length,
      content: item.newComment
    });
    item.newComment = "";
    setTick((c) => ++c);
  }

  return <>
    <h2>PureHtml</h2>

    <div className="action-bar">
      <input type="text" value={maxLength} onChange={(e) => setMaxLength(parseInt(e.target.value))} />
      <button onClick={() => logTime('run', run())}>run</button> &nbsp;&nbsp;&nbsp;&nbsp;
      <button onClick={() => logTime('unshift', unshift())}>unshift</button>
      <button onClick={() => logTime('push', push())}>push</button>
      <button onClick={() => logTime('shift', shift())}>shift</button>
      <button onClick={() => logTime('pop', pop())}>pop</button>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <input type="text" value={targetId} onChange={(e) => setTargetId(parseInt(e.target.value))} />
      <button onClick={() => logTime('move', move())}>move</button>
      <button onClick={() => logTime('change', change())}>change</button>
    </div>

    <div>

      {list.map((item) => {
        return (

          <div className="item-block" key={item.id}>
            <div>{item.author + item.id} :</div>
            <div>{item.content}</div>
            <div>
              <button
                className="btn"
                onClick={() => logTime('favorite', favorite(item))}
              >favorite {item.favorite || ''}</button>
              <button className="btn" onClick={() => logTime('like', like(item))}>like {item.like || ''}</button>
              <button
                className="btn"
                onClick={() => logTime('forward', forward(item))}
              >forward {item.forward || ''}</button>
              <button
                className="btn"
                onClick={() => logTime('toggle', toggle(item))}
              > comment {item.comments.length || ''}</button>
            </div>
            {
              item.isShowComment && (
                <div >
                  <input type="text" value={item.newComment} onChange={(e) => {
                    item.newComment = e.target.value;
                    setTick((c) => ++c);
                  }} />
                  <button onClick={() => logTime('comment', comment(item))} disabled={!item.newComment}>ok</button>

                  {
                    item.comments.map((comment: any) => {
                      return <div key={comment.id} > {comment.content}</div>
                    })
                  }
                </div >
              )
            }
          </div >
        )
      })}

    </div >
  </>
}

export default PureHtml;