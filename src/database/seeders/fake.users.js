import faker from 'faker';
import User from '../models/User.js';

const createFakeUser = async () => {
  const user = new User({
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    biography: faker.lorem.sentence(),
    avatar: faker.image.avatar(),
  });

  await user.save();
};

const createFakeUsers = async () => {
  for (let i = 0; i < 10; i++) {
    await createFakeUser();
  }
};
createFakeUsers();