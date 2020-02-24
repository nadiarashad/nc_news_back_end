const {
  topicData,
  articlesData,
  commentsData,
  userData
} = require('../data/index.js');

const { formatDates, formatComments, makeRefObj } = require('../utils/utils');

// console.log(articlesData)

exports.seed = function (knex) {
  return knex.migrate
    .rollback()
    .then(() =>
      knex.migrate.latest()
    )
    .then(() => {


      const topicsInsertions = knex('topics').insert(topicData)
      const usersInsertions = knex('users').insert(userData)


      return Promise.all([topicsInsertions, usersInsertions])
    })
    .then(() => {

      const formattedArticles = formatDates(articlesData)
      const articlesInsertions = knex('articles').insert(formattedArticles)

      return articlesInsertions

    })
    .then(articleRows => {

      const articleRefObj = makeRefObj(articleRows, 'title', 'article_id');
      return articleRefObj

    })
    .then(articleRefObj => {

      const modifiedData = formatComments(commentsData, articleRefObj, 'created_by', 'author')
      const furtherModified = formatComments(commentsData, articleRefObj, 'article_id', 'belongs_to')


      return Promise.all([modifiedData, furtherModified])
    })
  // .then(articlesData => {
  //   // const articleRefObj2 = makeRefObj(articlesData, 'title', 'article_id');


  //   // return articleRefObj2
  // })
  // .then(articleRefObj2 => {


  //   return furtherModified

  // })



  return knex
    .insert(furtherModified)
    .into('comments')
    .returning('*')


    // console.log()

    // const formattedComments = formatComments(commentsData, articleRef);
    // return knex('comments').insert(formattedComments);
    /* 

    Your comment data is currently in the incorrect format and will violate your SQL schema. 

    Keys need renaming, values need changing, and most annoyingly, your comments currently only refer to the title of the article they belong to, not the id. 
    
    You will need to write and test the provided makeRefObj and formatComments utility functions to be able insert your comment data.

    This utility function should be able to take an array of comment objects (`comments`) and a reference object, and return a new array of formatted comments.


    */

    // 
    ;
};
