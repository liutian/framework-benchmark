import React from 'react';
import { useState } from 'react';
import logger from './logger';

function App({ item }: { item: any }) {
  const [itemData, setItemData] = useState(item);

  const logTime = (sign: string, fnReturn?: any) => {
    logger(sign);
  }

  const toggle = () => {
    itemData.isShowComment = !itemData.isShowComment;
    setItemData({ ...itemData });
  }

  const favorite = () => {
    itemData.favorite += 1;
    setItemData({ ...itemData });
  }

  const like = () => {
    itemData.like += 1;
    setItemData({ ...itemData });
  }

  const forward = () => {
    itemData.forward += 1;
    setItemData({ ...itemData });
  }

  const comment = () => {
    itemData.comments.push({
      id: itemData.id + 10000 + itemData.comments.length,
      content: itemData.newComment
    });
    itemData.newComment = '';
    setItemData({ ...itemData });
  }


  return (
    <>
      <div>{itemData.author + itemData.id} :</div>
      <div>{itemData.content}</div>
      <div>
        <button className="btn" onClick={() => logTime('favorite', favorite())}>favorite {itemData.favorite || ''}</button>
        <button className="btn" onClick={() => logTime('like', like())}>like {itemData.like || ''}</button>
        <button className="btn" onClick={() => logTime('forward', forward())}> forward {itemData.forward || ''}</button >
        <button className="btn" onClick={() => logTime('toggle', toggle())}> comment {itemData.comments.length || ''}</button >
      </div >
      {
        itemData.isShowComment && (
          <div>
            <input type="text" value={itemData.newComment} onChange={(e) => {
              itemData.newComment = e.target.value;
              setItemData({ ...itemData });
            }} />
            <button onClick={() => logTime('comment', comment())} disabled={!itemData.newComment}> ok</button >
            {
              itemData.comments.map((comment: any) => {
                return (
                  <div key={comment.id}>
                    {comment.content}
                  </div>
                )
              })
            }
          </div>
        )
      }
    </>
  );
}

export default App;
