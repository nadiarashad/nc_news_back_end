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
  it('returns an array of multiple references when passed multiple objects', () => {
    const array = [{ article_id: 1, title: 'A' },
    { article_id: 2, title: 'B' },
    { article_id: 3, title: 'C' },
    { article_id: 4, title: 'D' }];
    expect(makeRefObj(array, 'title', 'article_id')).to.eql({ A: 1, B: 2, C: 3, D: 4 })
  });
  it('returns an array of multiple references when passed multiple objects', () => {
    const commentsArray = [
      {
        comment_id: 'Slaughterhouse-Five',
        author: 'Kurt Vonnegut',
        article_id: 1,
        votes: 0,
        created_at: '2020 18:53 etc',
        body: 'abcdefg'
      },
      {
        title: 'Blood Meridian',
        author: 'anti-western',
        article_id: 2,
        votes: 0,
        created_at: '2020 16:20 etc',
        body: 'hijklmnop'
      }
    ];
    expect(makeRefObj(commentsArray, 'author', 'article_id')).to.eql({ 'Kurt Vonnegut': 1, 'anti-western': 2 })
  });
});



describe('formatComments', () => {
  it('given an array of comments, returns an array of updated objects ', () => {
    const commentsArray = [
      { name: "Grammatics", artist: "Grammatics", releaseYear: 2009 },
      { name: "Kingdom of Rust", artist: "Doves", releaseYear: 2009 }
    ];

    const artistLookup = {
      Grammatics: 9923,
      Doves: 324
    };

    const actual = formatComments(commentsArray, artistLookup);
    const expected = [
      { name: "Grammatics", artistId: 9923, releaseYear: 2009 },
      { name: "Kingdom of Rust", artistId: 324, releaseYear: 2009 }
    ];



    // const commentsArray = [
    //   {
    //     comment_id: 'Slaughterhouse-Five',
    //     author: 'Kurt Vonnegut',
    //     article_id: 25,
    //     votes: 0,
    //     created_at: '2020 18:53 etc',
    //     body: 'abcdefg'
    //   },
    //   {
    //     title: 'Blood Meridian',
    //     author: 'Nadia Rashad',
    //     article_id: 36,
    //     votes: 0,
    //     created_at: '2020 16:20 etc',
    //     body: 'hijklmnop'
    //   }
    // ];

    // const refObj = { 'Kurt Vonnegut': 1, 'Nadia Rashad': 2 }

    // expect(formatComments(commentsArray, refObj, 'created_by', 'author')).to.eql([
    //   {
    //     comment_id: 'Slaughterhouse-Five',
    //     created_by: 'Kurt Vonnegut',
    //     article_id: 1,
    //     votes: 0,
    //     created_at: '2020 18:53 etc',
    //     body: 'abcdefg'
    //   },
    //   {
    //     title: 'Blood Meridian',
    //     created_by: 'Nadia Rashad',
    //     article_id: 2,
    //     votes: 0,
    //     created_at: '2020 16:20 etc',
    //     body: 'hijklmnop'
    //   }
    // ])
    // expect(formatComments(commentsArray, referenceObject)).to.be.an('Array');
    // expect(formatComments(commentsArray, referenceObject)).to.have.length(2);
    // expect(formatComments(commentsArray, referenceObject)[0]).to.be.an('Object')
  })

});


