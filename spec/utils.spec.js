const { expect } = require('chai');
const {
  formatDates,
  makeRefObj,
  formatComments,
} = require('../db/utils/utils');

describe('formatDates', () => {
  it('returns an empty array when passed an empty array', () => {
    const list = []
    const actual = formatDates(list)
    const expected = []
    expect(actual).to.eql(expected)
  });
  it('can take an array of one object and convert the timestamp to a js date object', () => {
    const list = [
      {
        title: 'Running a Node App',
        topic: 'coding',
        author: 'jessjelly',
        body: 'This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.',
        created_at: 1471522072389
      }]
    const actual = formatDates(list)
    const expected = [
      {
        title: 'Running a Node App',
        topic: 'coding',
        author: 'jessjelly',
        body: 'This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.',
        created_at: new Date(list[0].created_at)
      }]
    expect(actual).to.eql(expected)
  });
  it('returned array has different reference to input', () => {
    const list = [];
    expect(formatDates(list)).to.not.equal(list);
  });
});

describe('makeRefObj', () => {
  it('returns an empty object when passed an empt array', () => {
    const array = []
    expect(makeRefObj(array)).to.eql({})

  });
  it('can take multiple arguments', () => {
    const array = [{ article_id: 1, title: 'A' }];
    expect(makeRefObj(array)).to.eql({ A: 1 })
  });
  it('returns an array of multiple references when passed multiple objects', () => {
    const array = [{ article_id: 1, title: 'A' },
    { article_id: 2, title: 'B' },
    { article_id: 3, title: 'C' },
    { article_id: 4, title: 'D' }];
    expect(makeRefObj(array)).to.eql({
      A: 1, B: 2, C: 3, D: 4
    })
  });
});



describe('formatComments', () => {
  it('returns an empty array when passed an empty array', () => {
    const comments = []
    const refObject = {}
    expect(formatComments(comments, refObject)).to.eql([])
  });
  it('updates keys to new values and has the time at the correct format', () => {
    const refObject = { "The vegan carnivore?": 1, "Harry potter": 2 };
    const comments = [
      {
        body: "Maxime",
        belongs_to: "The vegan carnivore?",
        created_by: "jessjelly",
        votes: 2,
        created_at: 1474085868059
      },
      {
        body: "Lord Volodomor",
        belongs_to: "Harry potter",
        created_by: "JK Rowling",
        votes: 4,
        created_at: 1574085868059
      }
    ];
    const actual = [
      {
        body: "Maxime",
        votes: 2,
        created_at: new Date(1474085868059),
        article_id: 1,
        author: "jessjelly"
      },
      {
        body: "Lord Volodomor",
        votes: 4,
        created_at: new Date(1574085868059),
        article_id: 2,
        author: "JK Rowling"
      }
    ];
    expect(formatComments(comments, refObject)).to.deep.equal([
      {
        article_id: 1,
        author: "jessjelly",
        body: "Maxime",
        created_at: new Date(comments[0].created_at),
        votes: 2
      },
      {
        article_id: 2,
        author: "JK Rowling",
        body: "Lord Volodomor",
        created_at: new Date(comments[1].created_at),
        votes: 4
      }
    ]);
  });
});