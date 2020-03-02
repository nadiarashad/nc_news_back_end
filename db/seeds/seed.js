const {
  topicData,
  articlesData,
  commentsData,
  userData
} = require('../data/index.js');

const { formatDates, formatComments, makeRefObj } = require('../utils/utils');


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
      const articlesInsertions = knex('articles').insert(formattedArticles).returning('*')

      return articlesInsertions

    })
    .then(articlesInsertions => {

      const articleRefObj = makeRefObj(articlesInsertions);

      return articleRefObj

    })
    .then(articleRefObj => {

      const modifiedCommentsData = formatComments(commentsData, articleRefObj)

      return modifiedCommentsData

    }).then(modifiedCommentsData => {

      return knex('comments').insert(modifiedCommentsData)

    })
};
