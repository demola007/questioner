
class User {
  constructor() {
    this.userModel = [
      {
        id: 1,
        name: 'Saboki Demola',
        email: 'saboki@example.com',
        password: '1111111',
        isAdmin: true,
        jwtToken: 'o45y78werufiodjlkcxeds',
      },
      {
        id: 2,
        name: 'Test User',
        email: 'saboki@example.com',
        password: '1111111',
        isAdmin: false,
        jwtToken: 'iejafklnvcfsjdknzv849reiod',
      },
    ];
  }

  getUser(userId) {
    const user = this.userModel.find(x => x.id === userId);
    if (user) {
      return User.returnUserData(user);
    }
    return false;
  }


  authUser(token) {
    const user = this.userModel.find(x => x.jwtToken === token);
    if (user) {
      return User.returnUserData(user);
    }
    return false;
  }

  loginUser(userData) {
  // TODO.. hash password before push the data;
  // TODO delete password before returning;
    const user = this.userModel.find(x => x.email === userData.email
      && x.password === userData.password);
    if (user) {
      return User.returnUserData(user);
    }
    return false;
  }

  createUser(userData) {
  // validate data;
  // insert;
  // TODO test that data doesnt go through with ovalid input;
  // TODO.. hash password before push the data;

    this.userModel.push(userData);
    return this.getUser(userData.id);
  }

  static returnUserData(userData) {
    const getUserData = userData;

    // do stuff with userData
    delete getUserData.password;
    return getUserData;
  }
}

module.exports = User;
