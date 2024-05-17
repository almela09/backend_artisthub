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

const generateAndSaveFakeSuperAdmin = async () => {
    const user = new User({
        name: faker.name.findName(),
        nick: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        biography: faker.lorem.sentence(),
        avatar: faker.internet.avatar(),
        socialNetwork: [{
            name: 'Facebook',
            url: faker.internet.url()
        }],
        role: 'super_admin' // Establece el rol como 'super_admin'
    });

    try {
        await user.save();
        console.log('Super admin saved.');
    } catch (error) {
        console.error(`Error saving super admin: ${error}`);
    }
};

createFakeUsers();
generateAndSaveFakeSuperAdmin();