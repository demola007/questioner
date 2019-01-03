
const assert = require('assert');

const getModule = require('../src/modules');

const meetupModule = getModule('meetups');


describe('get all meetups [GET /meetups ]', () => {
  it('it should return an array of meetups', () => {
    assert(meetupModule.getMeetups() instanceof Array, 'Data returned for get meetups is not an array');
  });
});


describe('get a meetup [GET /meetups :param id<int> ]', () => {
  const meetupId = 2;
  const meetup = meetupModule.getMeetup(meetupId);
  it('it should return an array of meetup', () => {
    assert(meetup instanceof Array, 'Data returned for getMeetup(id) is not an array');
  });

  it('length of meetup returned should be one', () => {
    assert.equal(meetup.length, 1, 'getMeetup(id) does not return an array with exactly one element');
  });
});


describe('create a meetup [POST /meetups :param meetupData<Object> ]', () => {
  const meetupData = {
    id: 1,
    name: 'ProjectX',
    created: '2pm',
    likes: 0,
    upvote: 0,
  };

  it('it should not throw an exception  while creating a new meetup', () => {
    assert.doesNotThrow(() => meetupModule.createMeetup(meetupData), 'An exception occured while creating a new meetup');
  });

  it('It should return true after creating a meetup', () => {
    assert.equal(meetupModule.createMeetup(meetupData), true, 'createMeetup(object) did not return true after create');
  });
});


describe('create a meetup [POST /meetups :param meetupData<Object> ]', () => {
  const meetupData = {
    id: 1,
    name: 'ProjectX',
    created: '2pm',
    likes: 0,
    upvote: 0,
  };

  it('it should not throw an exception  while creating a new meetup', () => {
    assert.doesNotThrow(() => meetupModule.createMeetup(meetupData), 'An exception occured while creating a new meetup');
  });

  it('It should return true after creating a meetup', () => {
    assert.equal(meetupModule.createMeetup(meetupData), true, 'createMeetup(object) did not return true after create');
  });
});
