import React, { useContext } from 'react';
// import dataSource from 'src/App/dataSource';
import { StoreBContext } from 'src/App/storeB';

function ChildB() {
  const storeb = useContext<any>(StoreBContext);

  console.log('ChildB render');
  return (
    <div>
      ChildB
      <button onClick={() => storeb.tick()}>storeb.count {storeb.data.count}</button>
    </div>
  );
}

export default ChildB;
