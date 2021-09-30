import React, { useContext } from 'react';
// import dataSource from 'src/App/dataSource';
import { StoreAContext } from 'src/App/storeA';

function Sibling() {
  const storea = useContext<any>(StoreAContext);

  console.log('Sibling render');

  return (
    <div>
      Sibling
      <button onClick={() => storea.tick()}>storea.count {storea.data.count}</button>
    </div>
  );
}

export default Sibling;
