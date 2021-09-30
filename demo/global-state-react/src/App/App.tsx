import React from 'react';
import { useState } from 'react';
import dataSource from './dataSource';
import OtherParent from './OtherParent/OtherParent';
import Parent from './Parent/Parent';

function App() {
  const [, update] = useState(0);

  dataSource.update = () => {
    update(c => c + 1);
  }

  return (
    <>
      <Parent />
      <OtherParent />
    </>
  );
}

export default App;
