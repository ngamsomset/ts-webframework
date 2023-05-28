export class Attributes<T extends object> {
  constructor(private data: T) {}

  //1.get method will take in the K which will be key values of T. in this case
  //T is interface UserProps {
  //        id?: number;
  //        name?: string;
  //        age?: number;
  // }
  //then get() will return the data of that K(key).
  //2. convert this get() to arrow function because context issue.
  //if we try to call user.get('name') then we will get undefined
  //because in this class which get() got defined, have no 'user'.
  //by convert to arrow function, the scope of this fucntion points
  // to who ever call it which in this case a user.

  get = <K extends keyof T>(key: K): T[K] => {
    return this.data[key];
  };

  set(update: T): void {
    Object.assign(this.data, update);
  }

  getAll(): T {
    return this.data;
  }
}
