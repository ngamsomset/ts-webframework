import { User } from './models/User';

const user = new User({ id: 1 });
const user1 = new User({ name: 'kkk', age: 888 });
user.set({ name: 'xxxx', age: 999 });

user.save();
