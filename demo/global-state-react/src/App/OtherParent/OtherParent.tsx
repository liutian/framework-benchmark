import React from 'react';
import dataSource from '../dataSource';

function OtherParent() {

  console.log('OtherParent render');

  return (
    <div>
      OtherParent
      <button onClick={() => dataSource.tick()}>count {dataSource.count}</button>
    </div>
  );
}

export default OtherParent;
