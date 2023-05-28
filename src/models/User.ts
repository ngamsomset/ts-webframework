import { Eventing } from './Eventing';
import { Sync } from './Sync';
import { Attributes } from './Attributes';
export interface UserProps {
  //mark these as optional so that if we want to create a new instance of User we dont have to pass these in.
  id?: number;
  name?: string;
  age?: number;
}

const rootUrl = 'http://localhost:3000/users';
export class User {
  public events: Eventing = new Eventing();
  public sync: Sync<UserProps> = new Sync<UserProps>(rootUrl);
  public attributes: Attributes<UserProps>;

  constructor(attrs: UserProps) {
    this.attributes = new Attributes<UserProps>(attrs);
  }

  //pass through methods, this class act as a bridge between caller and another class.
  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  get get() {
    return this.attributes.get;
  }
}
