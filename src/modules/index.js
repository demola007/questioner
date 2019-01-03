
/*
 A factory to help create instances of modules as needed;
*/

const MeetupsModule = require('./meetup');
const QuestionsModule = require('./questions');
const UsersModule = require('./users');


const getModule = (moduleName) => {
  switch (moduleName) {
    case 'meetups':
      return new MeetupsModule();
    case 'questions':
      return new QuestionsModule();
    case 'users':
      return new UsersModule();
    default:
      break;
  }
  return null;
};

module.exports = getModule;
