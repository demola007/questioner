class Questions {
  constructor() {
    this.questionModel = null;
  }

  getQuestions() {
    this.meetups = ['meetup one'];
    return {
      upvotes: 2,
    };
  }

  getQuestion(questionId) {
    this.questionModel = ['meetup one'];
    return [
      {
        upvotes: 2,
      }
    ];
  }

  createQuestion(questionData) {
    return true;
  }

  upvoteQuestion(questionId) {
    return {
      upvotes: 3,
    }
  }

  downvoteQuestion(questionId) {
    return {
      upvotes: 1,
    }
  }

}

module.exports = Questions;
