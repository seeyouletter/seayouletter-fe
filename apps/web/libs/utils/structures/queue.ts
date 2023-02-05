export default class Queue<Value = unknown> {
  private queue: Value[];
  private front: number;
  private rear: number;

  private constructor(arr: Value[] = []) {
    this.queue = arr ?? [];

    this.front = 0;
    this.rear = 0;
  }

  public enqueue(value: Value) {
    this.queue[this.rear++] = value;
  }

  public dequeue(): Value | null {
    if (this.length === 0) return null;

    const value = this.queue[this.front];
    delete this.queue[this.front];

    this.front += 1;

    return value;
  }

  public get head() {
    return this.queue[this.front];
  }

  public get tail() {
    return this.queue[this.rear];
  }

  public get length() {
    return this.rear - this.front;
  }
}
