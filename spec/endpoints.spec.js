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
            it('GET: 200 responds with an article object including the comment count', () => {
                return request(app)
                    .get('/api/articles/1')
                    .expect(200)
                    .then(res => {
                        expect(res.body.article).to.be.an('Array')
                        res.body.article.forEach(article => expect(article).to.have.all.keys(['author', 'title', 'article_id', 'body', 'topic', 'created_at', 'votes', 'comment_count']))
                        expect(res.body.article[0].comment_count).to.eql('13')
                    })

            });
            it('GET: 404 responds with an error when entering a non-existent article id', () => {
                return request(app)
                    .get('/api/articles/999')
                    .expect(404)
                    .then(res => {
                        expect(res.body.msg).to.equal('Invalid ID')
                    })
            });
            it('GET: 400 responds with an error when entering an invalid path', () => {
                return request(app)
                    .get('/api/articles/banana')
                    .expect(400)
                    .then(res => {
                        expect(res.body.msg).to.equal('Bad request: missing required fields')

                    })
            });
            it('PATCH: 200 responds with an updated item by increasing the votes', () => {
                return request(app)
                    .patch('/api/articles/2')
                    .send({ inc_votes: 1 })
                    .expect(200)
                    .then(res => {
                        expect(res.body.article).to.be.an('Array')
                        res.body.article.forEach(article => expect(article).to.have.all.keys(['author', 'title', 'article_id', 'body', 'topic', 'created_at', 'votes']))
                        expect(res.body.article[0].votes).to.eql(1)
                    })
            });
            it('PATCH: 200 responds with an updated item by decreasing the votes', () => {
                return request(app)
                    .patch('/api/articles/2')
                    .send({ inc_votes: -1 })
                    .expect(200)
                    .then(res => {
                        expect(res.body.article).to.be.an('Array')
                        res.body.article.forEach(article => expect(article).to.have.all.keys(['author', 'title', 'article_id', 'body', 'topic', 'created_at', 'votes']))
                        expect(res.body.article[0].votes).to.eql(-1)
                    })
            });
            it('PATCH: 404 Responds error when id valid but no correspond.', () => {
                return request(app)
                    .patch('/api/articles/999')
                    .send({ inc_votes: 1 })
                    .expect(404)
                    .then(res => {
                        expect(res.body.msg).to.equal("Invalid ID - does not match")
                    })
            });
            it('PATCH: 400 responds with error when missing input fields', () => {
                return request(app)
                    .patch('/api/articles/5')
                    .send({})
                    .expect(400)
                    .then(res => {
                        expect(res.body.msg).to.equal("Bad request: missing required fields")
                    })
            });
            it('PATCH: 400 responds with error failing schema validation', () => {
                return request(app)
                    .patch('/api/articles/5')
                    .send({ inc_votes: 'Mitch' })
                    .expect(400)
                    .then(res => {
                        expect(res.body.msg).to.equal("Bad request: missing required fields")
                    })
            });

            it('POST: responds with the posted object', () => {
                return request(app)
                    .post('/api/articles/1/comments')
                    .send({ username: '', body: '' })
                    .expect(200)
                    .then(res => {
                        expect(res.body.comment).to.be.an('Array')

                    })
            });
        });

    });

});


