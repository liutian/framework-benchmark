export default function ($nextTick) {
  return (sign) => {
    const time = Date.now();
    $nextTick(() => {
      const diff = (Date.now() - time) / 1000;
      console.log(`${sign}[framework]: ${diff}s`);
    });

    setTimeout(() => {
      const diff = (Date.now() - time) / 1000;
      console.log(`${sign}[total]: ${diff}s`);
    });
  }

}