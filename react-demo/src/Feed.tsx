import React from 'react';
import { useState } from 'react';
import logger from './logger';

function App({ item }: { item: any }) {
  const [itemData, setItemData] = useState(item);

  const toggle = () => {
    logger('toggle');
    itemData.isShowComment = !itemData.isShowComment;
    setItemData({ ...itemData });
  }

  const like = () => {
    logger('like');
    itemData.like += 1;
    setItemData({ ...itemData });
  }

  const comment = () => {
    logger('comment');
    itemData.comments.push({
      id: itemData.id + 10000 + itemData.comments.length,
      content: itemData.newComment
    });
    itemData.newComment = '';
    setItemData({ ...itemData });
  }

  const keypress = () => {
    logger('keypress',true);
  }

  return (
    <>
      <div>{itemData.author + itemData.id} :</div>
      <div>{itemData.content}</div>
      <div>
        <button className="btn" onClick={() => like()}>like {itemData.like || ''}</button>
        <button className="btn" onClick={() => toggle()}> comment {itemData.comments.length || ''}</button >
      </div >
      {
        itemData.isShowComment && (
          <div>
            <input type="text" value={itemData.newComment} onChange={(e) => {
              itemData.newComment = e.target.value;
              setItemData({ ...itemData });
            }} onKeyPress={keypress}/>
            <button onClick={() => comment()} disabled={!itemData.newComment}> ok</button >
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
