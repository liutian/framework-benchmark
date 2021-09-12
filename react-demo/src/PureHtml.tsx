import { useState } from "react";
import logger from "./logger";
import { createItem } from "./util";

function PureHtml() {
  const [list, setList] = useState<any[]>([]);
  const [maxLength, setMaxLength] = useState(30000);
  const [targetId, setTargetId] = useState(10);
  const [, setTick] = useState(0);

  const run = () => {
    logger('run');
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

  const move = () => {
    logger('move');
    const index = list.findIndex(item => item.id === targetId);
    const [item] = list.splice(index, 1);
    list.unshift(item);
    setList([...list]);
  }

  const change = () => {
    logger('change');
    const index = list.findIndex(item => item.id === targetId);
    const item = createItem();
    list.splice(index, 1, item);
    setList([...list]);
  }

  const toggle = (item: any) => {
    logger('toggle');
    item.isShowComment = !item.isShowComment;
    setTick((c) => ++c);
  }

  const favorite = (item: any) => {
    logger('favorite');
    item.favorite += 1;
    setTick((c) => ++c);
  }

  const like = (item: any) => {
    logger('like');
    item.like += 1;
    setTick((c) => ++c);
  }

  const forward = (item: any) => {
    logger('forward');
    item.forward += 1;
    setTick((c) => ++c);
  }

  const comment = (item: any) => {
    logger('comment');
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
      <button onClick={() => run()}>run</button> &nbsp;&nbsp;&nbsp;&nbsp;
      <button onClick={() => unshift()}>unshift</button>
      <button onClick={() => push()}>push</button>
      <button onClick={() => shift()}>shift</button>
      <button onClick={() => pop()}>pop</button>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <input type="text" value={targetId} onChange={(e) => setTargetId(parseInt(e.target.value))} />
      <button onClick={() => move()}>move</button>
      <button onClick={() => change()}>change</button>
    </div>

    <div>

      {list.map((item) => {
        return (

          <div className="item-block" key={item.id}>
            <div>{item.author + item.id} :</div>
            <div>{item.content}</div>
            <div>
              <button onClick={() => favorite(item)}>favorite {item.favorite || ''}</button>
              <button onClick={() => like(item)}>like {item.like || ''}</button>
              <button onClick={() => forward(item)} >forward {item.forward || ''}</button>
              <button onClick={() => toggle(item)}>comment {item.comments.length || ''}</button>
            </div>
            {
              item.isShowComment && (
                <div >
                  <input type="text" value={item.newComment} onChange={(e) => {
                    item.newComment = e.target.value;
                    setTick((c) => ++c);
                  }} />
                  <button onClick={() => comment(item)} disabled={!item.newComment}>ok</button>

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