import { Axios, AxiosPromise, AxiosResponse } from 'axios';

interface ModelAttributes<T> {
  getAll(): T;
  set(value: T): void;
  get<K extends keyof T>(key: K): T[K];
}

interface Sync<T> {
  fetch(id: number): AxiosPromise;
  save(data: T): AxiosPromise;
}

interface Events {
  on(eventName: string, callback: () => void): void;
  trigger(eventName: string): void;
}

interface HasId {
  id?: number;
}

export class Model<T extends HasId> {
  constructor(
    private attributes: ModelAttributes<T>,
    private events: Events,
    private sync: Sync<T>
  ) {}
  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  get get() {
    return this.attributes.get;
  }

  set(update: T): void {
    this.attributes.set(update);
    this.events.trigger('change');
  }

  fetch(): void {
    //get the id of the user that we want to fetch
    const id = this.get('id');

    //check if id exist.
    if (typeof id !== 'number') {
      throw new Error('ID not exist!');
    }

    //then call fetch() which is in Sync class then set the data with the return res.
    this.sync.fetch(id).then((res: AxiosResponse): void => {
      this.set(res.data);
    });
  }

  save(): void {
    this.sync.save(this.attributes.getAll()).then((res: AxiosResponse) => {
      this.trigger('save');
    });
  }
}
