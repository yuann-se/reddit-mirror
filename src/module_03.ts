import { hot } from 'react-hot-loader/root';

// Task 1
function concat(arg1: string, arg2: string): string {
  return arg1 + arg2;
}

console.log(concat('Hello ', 'World'));

// Task 2
interface IObj {
  howIDoIt: string;
  someArray: Array<string | number>;
}

interface ITask extends IObj {
  withData: Array<IObj>
}

const MyHometask: ITask = {
  howIDoIt: "I Do It Wel",
  someArray: ["string one", "string two", 42],
  withData: [{ howIDoIt: "I Do It Wel", someArray: ["string one", 23] }],
}

// Task 3
interface MyArray<T> {
  [N: number]: T;
  reduce<U>(func: (previousValue: U, currentValue: T) => U, initVal?: U): U
}

const arr: MyArray<number> = [1, 2, 6];
console.log(arr.reduce((val1, val2) => val1 + val2, 5));

