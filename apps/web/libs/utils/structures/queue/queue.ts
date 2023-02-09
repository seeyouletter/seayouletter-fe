export interface QueueInterface<Value = unknown> {
  _queue: Value[];
  _front: number;
  _rear: number;

  enqueue: (value: Value) => void;

  dequeue: () => Value | null;

  head: Value | null;

  tail: Value | null;

  length: number;
}

export class Queue<Value = unknown> implements QueueInterface<Value> {
  public _queue;
  public _front;
  public _rear;

  public constructor(arr: Value[] = []) {
    this._queue = arr;

    this._front = 0;
    this._rear = 0;
  }

  public enqueue(value: Value) {
    this._queue[this._rear++] = value;
  }

  public dequeue(): Value | null {
    if (this.length === 0) return null;

    const value = this._queue[this._front];
    delete this._queue[this._front];

    this._front += 1;

    return value;
  }

  public get head() {
    return this._queue[this._front];
  }

  public get tail() {
    return this._queue[this._rear];
  }

  public get length() {
    return this._rear - this._front;
  }
}
