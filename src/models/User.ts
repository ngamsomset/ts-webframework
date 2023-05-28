import { Eventing } from './Eventing';
export interface UserProps {
  //mark these as optional so that if we want to create a new instance of User we dont have to pass these in.
  id?: number;
  name?: string;
  age?: number;
}

export class User {
  public events: Eventing = new Eventing();

  constructor(private data: UserProps) {}

  get(propName: string): string | number {
    return this.data[propName];
  }

  set(update: UserProps): void {
    Object.assign(this.data, update);
  }
}
