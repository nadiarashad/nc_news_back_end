process.env.NODE_ENV = 'test'
const app = require('../app')
const knex = require('../db/connection')
const request = require('supertest')
const { expect } = require('chai')

// chai.use(require("sams-chai-sorted"))

describe('/api', () => {
    after(() => {
        return knex.destroy()
    })
    beforeEach(() => {
        return knex.seed.run()
    })
    describe('/topics', () => {
        it('GET: 200 responds with all of the topic data', () => {
            return request(app)
                .get('/api/topics')
                .expect(200)
                .then(res => {
                    expect(res.body.topics).to.be.an('Array')
                    res.body.topics.forEach(topic => expect(topic).to.have.all.keys(['description', 'slug']))
                })
        });
        it('GET: 404 responds with method not allow when invalid path', () => {
            return request(app)
                .get('/api/INVALID_PATH')
                .expect(404)
                .then(res => {
                    expect(res.body.msg).to.equal('Route not found')
                })
        });
    });

    describe('/users', () => {
        describe('/:username', () => {
            it('GET: 200 responds with an object of the inputted username', () => {
                return request(app)
                    .get('/api/users/butter_bridge')
                    .expect(200)
                    .then(res => {
                        expect(res.body.user).to.be.an('Array')
                        res.body.user.forEach(user => expect(user).to.have.all.keys(['username', 'name', 'avatar_url']))
                    })
            });
            it('GET: 404 responds with method not allow when invalid path', () => {
                return request(app)
                    .get('/api/users/INVALID_PATH')
                    .expect(404)
                    .then(res => {
                        expect(res.body.msg).to.equal('Route not found')
                    })
            });

        });
    });


    describe('/articles', () => {
        describe('/:article_id', () => {
            it('GET: 200 responds with an article object', () => {
                return request(app)
                    .get('/api/articles/2')
                    .expect(200)
                    .then(res => {
                        expect(res.body.article).to.be.an('Array')
                        res.body.article.forEach(article => expect(article).to.have.all.keys(['author', 'title', 'article_id', 'body', 'topic', 'created_at', 'votes', 'comment_count']))
                    })

            });
        });
    });

});


