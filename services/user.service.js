const { User } = require('../models');

class UsersService {
    findUserByEmail(email) {
        return User.findOne({ where: { email } });
    }
  
    createUser(data) {
        return User.create(data);
    }

  }
  
  module.exports = new UsersService();