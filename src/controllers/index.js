
/*
 A factory to help create singleton instances of modules as needed;
*/

const MeetupsModule = require('./meetup');
//import MeetupsModule from './meetup'
const QuestionsModule = require('./questions');
//import QuestionsModule from './questions'
const UsersModule = require('./users');
//import UsersModule from './users'

let meetupModuleInstance = null;
let questionModuleInstance = null;
let usersModuleInstance = null;

const getModule = (moduleName) => {
  switch (moduleName) {
    case 'meetups':
      if (meetupModuleInstance === null) {
        meetupModuleInstance = new MeetupsModule();
      }
      return meetupModuleInstance;
    case 'questions':
      if (questionModuleInstance === null) {
        questionModuleInstance = new QuestionsModule();
      }
      return questionModuleInstance;
    case 'users':
      if (usersModuleInstance === null) {
        usersModuleInstance = new UsersModule();
      }
      return usersModuleInstance;
    default:
      break;
  }
  return null;
};

module.exports = getModule;
//export default getModule;