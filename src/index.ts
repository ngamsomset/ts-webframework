import { User } from './models/User';

const user = new User({ id: 1, name: 'test name' });

console.log(user.get('name'));
