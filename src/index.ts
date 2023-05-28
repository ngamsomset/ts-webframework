import { User } from './models/User';

const user = new User({ id: 1, name: 'test name' });

user.on('change', () => {
  console.log('User was changed');
});

user.set({ name: 'new name' });
