import React, { useContext } from 'react';
// import dataSource from 'src/App/dataSource';
import { StoreCContext } from 'src/App/storeC';

function ChildA() {
  const storec = useContext<any>(StoreCContext);

  console.log('ChildA render');
  return (
    <div>
      ChildA
      <button onClick={() => storec.tick()}>storec.count {storec.data.count}</button>
    </div>
  );
}

export default ChildA;
