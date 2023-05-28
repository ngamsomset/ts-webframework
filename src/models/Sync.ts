import axios, { AxiosPromise } from 'axios';

interface HasId {
  id?: number;
}

//make Sync class to be a generic class so that we can pass any type of value to this class. eg. User, students.
export class Sync<T extends HasId> {
  constructor(public rootUrl: string) {}
  fetch(id: number): AxiosPromise {
    return axios.get(`${this.rootUrl}/${id}`);
  }

  save(data: T): AxiosPromise {
    const { id } = data;

    if (id) {
      return axios.put(`${this.rootUrl}/${id}`, data);
    } else {
      return axios.post('${this.rootUrl}', data);
    }
  }
}
