import { User } from './models/User';

const user = new User({ name: 'John', age: 20 });

console.log(user.get('name'));
console.log(user.get('age'));

user.set({ name: 'x', age: 15 });
user.set({ name: 'xxxx' });

console.log(user.get('name'));
console.log(user.get('age'));
