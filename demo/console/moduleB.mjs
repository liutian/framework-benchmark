import share from './moduleC.mjs';

export const minus = () => {
  share.count--;
}

export const print = () => {
  console.log(`moduleB count: ${share.count}`);
}