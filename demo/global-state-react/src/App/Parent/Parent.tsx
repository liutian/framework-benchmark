import React from 'react';
import dataSource from '../dataSource';
import Demo from './Demo/Demo';
import Sibling from './Sibling/Sibling';

function Parent() {
  console.log('Parent render');

  return (
    <div style={{ border: 'solid 1px red' }}>
      Parent
      <button onClick={() => dataSource.tick()}>count {dataSource.count}</button>
      <Demo />
      <Sibling />
    </div>
  );
}

export default Parent;
