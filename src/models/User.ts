import { Eventing } from './Eventing';
import { Sync } from './Sync';
import { Attributes } from './Attributes';
import { AxiosResponse } from 'axios';
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

  set(update: UserProps): void {
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
