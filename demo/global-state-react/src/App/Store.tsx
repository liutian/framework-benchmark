import React from 'react';
import { useState } from 'react';
import storeA, { StoreAContext } from './storeA';
import storeB, { StoreBContext } from './storeB';
import storeC, { StoreCContext } from './storeC';


export function Store(props: any) {
  const [storea, setStoreA] = useState(storeA);
  const [storeb, setStoreB] = useState(storeB);
  const [storec, setStoreC] = useState(storeC);


  storeA.update = () => {
    setStoreA({ ...storea });
  }

  storeB.update = () => {
    setStoreB({ ...storeb });
  }

  storeC.update = () => {
    setStoreC({ ...storec });
  }

  return (
    <StoreAContext.Provider value={storea}>
      <StoreBContext.Provider value={storeb}>
        <StoreCContext.Provider value={storec}>
          {props.children}
        </StoreCContext.Provider>
      </StoreBContext.Provider>
    </StoreAContext.Provider>
  );
}


export default Store;
