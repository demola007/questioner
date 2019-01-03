
class Meetup {
  constructor(meetupModel) {
    this.meetupModel = meetupModel;
  }

  getMeetups(isUpcoming = false) {
    console.log(isUpcoming);
    this.meetups = ['meetup one', 'meetup two', 'meetup three'];
    return this.meetups;
  }

  getMeetup(meetupId) {
    this.meetups = ['meetup one'];
    return this.meetups;
  }

  createMeetup(meetupData) {
    this.meetups = ['meetup one', 'meetup two', 'meetup three'];
    return true;
  }

  removeMeetup() {
    this.meetups = ['meetup one', 'meetup two', 'meetup three'];
    return this.meetups;
  }

  updateMeetups() {
    this.meetups = ['meetup one', 'meetup two', 'meetup three'];
    return this.meetups;
  }

  meetupRSVP() {
    this.meetups = ['meetup one', 'meetup two', 'meetup three'];
    return this.meetups;
  }
}

module.exports = Meetup;
