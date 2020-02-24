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
  it('can take multiple arguments', () => {
    const array = [{ article_id: 1, title: 'A' }];
    expect(makeRefObj(array, 'title', 'article_id')).to.eql({ A: 1 })
  });
});



describe('formatComments', () => {
  it('given an array of books, returns an array of book objects ', () => {
    const books = [
      {
        title: 'Slaughterhouse-Five',
        writtenBy: 'Kurt Vonnegut'
      },
      {
        title: 'Blood Meridian',
        genre: 'anti-western',
        writtenBy: 'change my key'
      }
    ];
    expect(formatComments(books, 'writtenBy', 'author')).to.be.an('Array');
    expect(formatComments(books, 'writtenBy', 'author')).to.have.length(2);
    expect(formatComments(books, 'writtenBy', 'author')[0]).to.be.an('Object')
  })
  it('book objects in array have different reference to original book objects', () => {
    const books = [
      {
        title: 'Slaughterhouse-Five',
        writtenBy: 'Kurt Vonnegut'
      },
      {
        title: 'Blood Meridian',
        genre: 'anti-western',
        writtenBy: 'change my key'
      }
    ];
    expect(formatComments(books, 'writtenBy', 'author')[0]).to.not.equal(books[0]);
  });
  it('updates the key with the newKey', () => {
    const books = [
      {
        title: 'Slaughterhouse-Five',
        writtenBy: 'Kurt Vonnegut'
      },
      {
        title: 'Blood Meridian',
        genre: 'anti-western',
        writtenBy: 'Nadia'
      }
    ];
    expect(formatComments(books, 'writtenBy', 'author')).to.eql([
      {
        title: 'Slaughterhouse-Five',
        author: 'Kurt Vonnegut'
      },
      {
        title: 'Blood Meridian',
        genre: 'anti-western',
        author: 'Nadia'
      }
    ]);
  });
  it('original book array is not mutated', () => {
    const books = [
      {
        title: 'Slaughterhouse-Five',
        writtenBy: 'Kurt Vonnegut'
      },
      {
        title: 'Blood Meridian',
        genre: 'anti-western',
        writtenBy: 'change my key'
      }
    ];
    formatComments(books, 'writtenBy', 'author');
    expect(books, 'writtenBy', 'author').to.eql([
      {
        title: 'Slaughterhouse-Five',
        writtenBy: 'Kurt Vonnegut'
      },
      {
        title: 'Blood Meridian',
        genre: 'anti-western',
        writtenBy: 'change my key'
      }
    ]);
  });
});


