import { User, UserProps } from './User';
import { Eventing } from './Eventing';
import axios, { AxiosResponse } from 'axios';

export class Collection {
  models: User[] = [];
  events: Eventing = new Eventing();

  constructor(public rootUrl: string) {}

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  fetch(): void {
    axios.get(this.rootUrl).then((res: AxiosResponse) => {
      res.data.forEach((val: UserProps) => {
        const user = User.buildUser(val);
        this.models.push(user);
      });
      this.trigger('change');
    });
  }
}
