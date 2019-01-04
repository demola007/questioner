
const BaseErrClass = require('../helpers/BaseErrorClass');
const ErrorStrings = require('../helpers/repsonseStringHelper');

const radix = 10;

class MeetupNotFoundError extends BaseErrClass {
  constructor(...args) {
    super(...args);
    Error.captureStackTrace(this, MeetupNotFoundError);
  }
}

class RSVPError extends BaseErrClass {
  constructor(...args) {
    super(...args);
    Error.captureStackTrace(this, RSVPError);
  }
}

class Meetup {
  constructor() {
    this.meetupModel = [];
    this.rsvpModel = [];
    this.MeetupNotFoundError = MeetupNotFoundError;
    this.RSVPError = RSVPError;
  }

  getMeetups() {
    return new Promise(resolve => resolve(this.meetupModel));
  }

  getUpcomingMeetups(userId) {
    return new Promise((resolve) => {
      const rsvps = this.rsvpModel
        .filter(x => x.user === userId) // get all rsvps
        .map(x => x.meetup); // return only the meetp id

      const upcomingMeetups = this.meetupModel.filter(x => rsvps.indexOf(x.id) !== -1);
      return resolve(upcomingMeetups);
    });
  }

  getMeetup(meetupId) {
    return new Promise((resolve, reject) => {
      const meetup = this.meetupModel.find(x => x.id === parseInt(meetupId, radix));
      if (meetup) {
        return resolve(meetup);
      }
      return reject(new MeetupNotFoundError(ErrorStrings.meetupNotFound));
    });
  }

  createMeetup(meetupData) {
    return new Promise((resolve) => {
      meetupData.id = this.meetupModel.length;
      meetupData.happeningOn = new Date();
      this.meetupModel.push(meetupData);
      return resolve(meetupData);
    });
  }

  // removeMeetup(meetupId) {
  //   return new Promise((resolve) => {
  //    for (let index = 0; index < this.meetupModel.length; index += 1) {
  //       if (this.meetupModel[index].id === meetupId) {
  //         this.meetupModel.splice(index, 1);
  //       }
  //     }
  //     return resolve(true);
  //   });
  // }

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

  // Todo needs more info
  meetupRSVP(rsvpData) {
    return new Promise((resolve, reject) => {
      const meetup = this.meetupModel.find(x => x.id === parseInt(rsvpData.meetup, radix));
      if (meetup) {
        const hasRsvped = this.rsvpModel.find(x => x.user === parseInt(rsvpData.user, radix)
         && x.meetup, radix === parseInt(rsvpData.meetup, radix));
        if (!hasRsvped) {
          this.rsvpModel.push(rsvpData);
          // return all rsvp
          return resolve(this.rsvpModel);
        }
        reject(new RSVPError(ErrorStrings.AlreadyRsvped));
      }
      return reject(new MeetupNotFoundError(ErrorStrings.meetupNotFound));
    });
  }
}

module.exports = Meetup;
