import { User } from './models/User';

const user = new User({ id: 1, name: 'newnew', age: 10 });

user.on('save', () => {
  console.log(user);
});

user.save();
