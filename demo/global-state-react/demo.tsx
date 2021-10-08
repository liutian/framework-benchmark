import React, { useState } from 'react';

let globalState: any = { count: 1 };
let forceUpdate;
let tick = 0;

function useGlobalState() {
  const update = () => {
    forceUpdate(++tick);
  };

  return [globalState, update];
}

export default function App() {
  const [, setState] = useState();
  forceUpdate = setState;

  return (
    <>
      <DemoA />
      <DemoB />
    </>
  );
}

function DemoA() {
  const [state, setState] = useGlobalState();
  const add = () => {
    state.count += 1;
    setState();
  };

  return (
    <>
      <button onClick={add}>DemoA {state.count}</button>
    </>
  );
}

function DemoB() {
  const [state, setState] = useGlobalState();
  const add = () => {
    state.count += 1;
    setState();
  };

  return (
    <>
      <button onClick={add}>DemoB {state.count}</button>
    </>
  );
}
