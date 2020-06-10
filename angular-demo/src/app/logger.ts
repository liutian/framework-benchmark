import { Observable } from 'rxjs';

export default function (observable: Observable<any>, sign: string) {
  const time = Date.now();
  observable.subscribe(() => {
    const diff = (Date.now() - time) / 1000;
    console.log(`${sign}[framework]: ${diff}s`);
  });

  setTimeout(() => {
    const diff = (Date.now() - time) / 1000;
    console.log(`${sign}[total]: ${diff}s`);
  });
}