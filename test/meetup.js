
const assert = require('assert');

const getModule = require('../src/modules');

const meetupModule = getModule('meetups');

const meetupData = {
  location: 'Lekki, Banana island ',
  images: ['img1.jpg', 'img2.jpg'],
  topic: 'Mocha test one',
  happeningOn: new Date(),
  tags: ['#cool', '#makenigeriagreatagain'],
  user: 1,
  id: 0,
};


const rsvpData = {
  meetup: 2,
  user: 1,
  response: 'yes',
  id: 1,
};


describe('get all meetups [GET /meetups ]', () => {
  it('it should return an array of meetups', async () => {
    const meetups = await meetupModule.getMeetups();
    assert(meetups instanceof Array);
  });
});


describe('get a meetup [GET /meetups :param id<int> ]', () => {
  // add meetup
  before(() => new Promise((resolve) => {
    const meetupAdded = meetupModule.createMeetup(meetupData);
    resolve(meetupAdded);
  }));

  it('it should return a meetup object', async () => {
    const meetup = await meetupModule.getMeetup(meetupData.id);
    assert(meetup instanceof Object);
  });

  it('it should return same meetup added earlier', async () => {
    const meetup = await meetupModule.getMeetup(meetupData.id);
    assert.deepEqual(meetup, meetupData);
  });
});


describe('create a meetup [POST /meetups :param meetupData<Object> ]', () => {
  it('it should not throw an exception  while creating a new meetup', () => {
    assert.doesNotThrow(() => meetupModule.createMeetup(meetupData));
  });

  it('should return same data inserted  as newly added meetup', async () => {
    const meetup = await meetupModule.createMeetup(meetupData);
    assert.equal(meetup, meetupData);
  });
});

describe('POST: RSVP a meetup [POST /meetups/<id>/rsvps :param rsvpData<Object> ]', async () => {
  it('it should not reject when adding rsvp', async () => {
    before(() => new Promise(async (resolve) => {
      meetupModule.meetupModel = [];
      const meetup = await meetupModule.createMeetup(meetupData);
      resolve(meetup);
    }));
    await assert.doesNotReject(async () => meetupModule.meetupRSVP(rsvpData));
  });

  it('it should return newly added rsvp', async () => {
    meetupModule.rsvpModel = [];
    const rsvp = await meetupModule.meetupRSVP(rsvpData);
    assert.equal(rsvp[0], rsvpData);
  });

  it('it should not rsvp more than once', async () => {
    await assert.rejects(async () => meetupModule.meetupRSVP(rsvpData));
  });
});
