export class Attributes<T extends object> {
  constructor(private data: T) {}

  //get method will take in the K which will be key values of T. in this case
  //T is interface UserProps {
  //        id?: number;
  //        name?: string;
  //        age?: number;
  // }
  //then get() will return the data of that K(key).
  get = <K extends keyof T>(key: K): T[K] => {
    return this.data[key];
  };

  set(update: T): void {
    Object.assign(this.data, update);
  }
}
