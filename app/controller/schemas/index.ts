import users from './users';

export default {
  users,

  common: {
    async isAdmin (user: any) {
      if (!user) {
        throw TypeError('参数有误');
      }
      const typeofUser = typeof user;
      if (typeofUser === 'number') {
        user = await users.getById(user);
      } else if (typeofUser === 'string') {
        user = await users.getByUsername(user);
      }
      return user ? user.is_admin === 1 : false;
    },
  },
}