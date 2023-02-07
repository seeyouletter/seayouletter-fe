import { Blocks, Groups } from 'ui';

import { Queue, QueueInterface } from './queue';

type TaskType = 'create' | 'update' | 'delete';

interface TaskTransaction {
  taskType: TaskType;
  before: (Blocks | Groups)[];
  after: (Blocks | Groups)[];
}

export class TemplateTaskQueue implements QueueInterface<TaskTransaction> {
  public _queue: TaskTransaction[];
  public _front: number;
  public _rear: number;
  private _garbages: Queue<TaskTransaction>;

  public constructor(arr: TaskTransaction[] = []) {
    this._queue = arr;

    this._front = 0;
    this._rear = 0;
    this._garbages = new Queue<TaskTransaction>([]);
  }

  public enqueue(value: TaskTransaction) {
    this._queue[this._rear++] = value;
    this._garbages = new Queue([]);
  }

  public dequeue(): TaskTransaction | null {
    if (this.length === 0) return null;

    const value = this._queue[this._front];
    delete this._queue[this._front];

    this._front += 1;

    this._garbages.enqueue(value);

    return value;
  }

  public get head(): null | TaskTransaction {
    if (this.length === 0) return null;

    return this._queue[this._front];
  }

  public get tail(): null | TaskTransaction {
    if (this.length === 0) return null;

    return this._queue[this._rear - 1];
  }

  public get length() {
    return this._rear - this._front;
  }

  /**
   * @description
   *
   * 추후 되돌리기 로직이 있을 시 이전 상태를 복구하기 위한 메서드입니다.
   */
  public restore(): null | TaskTransaction {
    if (!this.length) return null;

    const value = this._queue.pop();
    if (!value) return null;

    this._garbages.enqueue(value);
    return value;
  }

  public get originQueue() {
    return [...this._queue];
  }
}
