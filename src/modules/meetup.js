
const BaseErrClass = require('../helpers/BaseErrorClass');

class MeetupNotFoundError extends BaseErrClass {
  constructor(...args) {
    super(...args);
    Error.captureStackTrace(this, MeetupNotFoundError);
  }
}

class Meetup {
  constructor() {
    this.meetupModel = [];
  }

  getMeetups(isUpcoming = false) {
    return new Promise((resolve) => {
      if (isUpcoming) {
        return resolve(this.meetupModel.filter(x => x.isUpcoming === true));
      }
      return resolve(this.meetupModel);
    });
  }

  getMeetup(meetupId) {
    return new Promise((resolve, reject) => {
      const meetup = this.meetupModel.find(x => x.id === meetupId);
      if (meetup) {
        return resolve(meetup);
      }
      return reject(new MeetupNotFoundError());
    });
  }

  createMeetup(meetupData) {
    return new Promise((resolve) => {
      meetupData.id = this.meetupModel.length;
      this.meetupModel.push(meetupData);
      return resolve(meetupData);
    });
  }

  removeMeetup(meetupId) {
    return new Promise((resolve) => {
      for (let index = 0; index < this.meetupModel.length; index += 1) {
        if (this.meetupModel[index].id === meetupId) {
          this.meetupModel.splice(index, 1);
        }
      }
      return resolve(true);
    });
  }

  // updateMeetups(meetupId) {
  //  return new Promise((resolve) => {
  //    for (let index = 0; index < this.meetupModel.length; index += 1) {
  //     if (this.meetupModel[index].id === meetupId) {
  //       this.meetupModel.splice(index, 1);
  //     }
  //   }
  //    return resolve(true);
  //  });
  // }

  meetupRSVP() {
    this.meetups = ['meetup one', 'meetup two', 'meetup three'];
    return this.meetups;
  }
}

module.exports = Meetup;
