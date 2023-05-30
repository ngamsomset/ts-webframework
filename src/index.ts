import { User } from './models/User';

const user = User.buildUserCollection();

user.on('change', () => {
  console.log(user);
});

user.fetch();
