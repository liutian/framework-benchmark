import share from './moduleC.mjs';

export const add = () => {
  share.count++;
}

export const print = () => {
  console.log(`moduleA count: ${share.count}`);
}