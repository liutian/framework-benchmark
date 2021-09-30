import React from 'react';
import { useContext } from 'react';
// import dataSource from 'src/App/dataSource';
import { StoreAContext } from 'src/App/storeA';
import ChildA from './ChildA/ChildA';
import ChildB from './ChildB/ChildB';

function Demo() {
  const storea = useContext<any>(StoreAContext);

  console.log('Demo render');

  return (
    <div style={{ border: 'solid 1px blue' }}>
      Demo
      <button onClick={() => storea.tick()}>storea.count {storea.data.count}</button>
      <ChildA />
      <ChildB />
    </div>
  );
}

export default Demo;
