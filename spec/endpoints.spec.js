process.env.NODE_ENV = 'test'
const app = require('../app')
const knex = require('../db/connection')
const request = require('supertest')
const { expect } = require('chai')
const chai = require("chai")
chai.use(require("sams-chai-sorted"))

describe('/api', () => {
    after(() => {
        return knex.destroy()
    })
    beforeEach(() => {
        return knex.seed.run()
    })

    // it.only('DELETE: 405 Error when attempting to delete all of the database', () => {
    //     return request(app)
    //         .delete('/api')
    //         .expect(405)
    //         .then(res => {
    //             expect(res.body.msg).to.eql('Method not allowed')
    //         })
    // });



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
                        console.log(res.body)
                        expect(res.body.user).to.be.an('Object')
                        expect(res.body.user).to.have.all.keys('username', 'name', 'avatar_url')
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

        it('GET: 200 returns all articles', () => {
            return request(app)
                .get('/api/articles')
                .expect(200)
                .then(res => {
                    expect(res.body.articles).to.be.an('Array')
                    res.body.articles.forEach(article => expect(article).to.have.all.keys(['author', 'title', 'article_id', 'topic', 'created_at', 'votes', 'comment_count']))

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

        it('GET: 200 responds with articles sorted by specified valid column', () => {
            return request(app)
                .get('/api/articles?sort_by=author')
                .expect(200)
                .then(res => {
                    expect(res.body.articles).to.be.an('Array')
                    res.body.articles.forEach(article => expect(article).to.have.all.keys(['author', 'title', 'article_id', 'topic', 'created_at', 'votes', 'comment_count']))
                    expect(res.body.articles).to.be.sortedBy('author', { descending: true })
                })
        });
        it('GET: 200 responds with articles defaulted to "date" when no query is passed', () => {
            return request(app)
                .get('/api/articles')
                .expect(200)
                .then(res => {
                    expect(res.body.articles).to.be.an('Array')
                    res.body.articles.forEach(article => expect(article).to.have.all.keys(['author', 'title', 'article_id', 'topic', 'created_at', 'votes', 'comment_count']))
                    console.log(res.body)
                    expect(res.body.articles[0].created_at).to.eql('2018-11-15T12:21:54.171+00:00')
                })
        });
        it('GET: 200 responds with articles ordered to ascending, defaults to descending', () => {
            return request(app)
                .get('/api/articles?sort_by=author&&order_by=asc')
                .expect(200)
                .then(res => {
                    expect(res.body.articles).to.be.an('Array')
                    res.body.articles.forEach(article => expect(article).to.have.all.keys(['author', 'title', 'article_id', 'topic', 'created_at', 'votes', 'comment_count']))
                    expect(res.body.articles).to.be.sortedBy('author')
                    expect(res.body.articles[0].author).to.eql('butter_bridge')
                })
        });
        it('GET: 200 responds with articles ordered to ascending', () => {
            return request(app)
                .get('/api/articles?order_by=asc')
                .expect(200)
                .then(res => {
                    expect(res.body.articles).to.be.an('Array')
                    res.body.articles.forEach(article => expect(article).to.have.all.keys(['author', 'title', 'article_id', 'topic', 'created_at', 'votes', 'comment_count']))
                })
        });
        it('GET: 200 responds with articles default ordered to descending', () => {
            return request(app)
                .get('/api/articles')
                .expect(200)
                .then(res => {
                    expect(res.body.articles).to.be.an('Array')
                    res.body.articles.forEach(article => expect(article).to.have.all.keys(['author', 'title', 'article_id', 'topic', 'created_at', 'votes', 'comment_count']))
                })
        });
        it('GET: 200 responds with a filter of articles by username', () => {
            return request(app)
                .get('/api/articles?author=icellusedkars')
                .expect(200)
                .then(res => {

                    expect(res.body.articles).to.be.an('Array')
                    res.body.articles.forEach(article => expect(article).to.have.all.keys(['author', 'title', 'article_id', 'topic', 'created_at', 'votes', 'comment_count']))
                    expect(res.body.articles[0].author).to.eql('icellusedkars')
                })
        });
        it('GET: 200 returns all articles for author lurkey empty array', () => {
            return request(app)
                .get('/api/articles?author=lurker')
                .expect(200)
                .then(res => {
                    console.log(res.body)
                    expect(res.body.articles).to.be.an('Array')
                    expect(res.body.articles).to.eql([])

                })
        });

        it('GET: 200 responds with a filter of articles by topics', () => {
            return request(app)
                .get('/api/articles?topic=mitch')
                .expect(200)
                .then(res => {
                    expect(res.body.articles).to.be.an('Array')
                    res.body.articles.forEach(article => expect(article).to.have.all.keys(['author', 'title', 'article_id', 'topic', 'created_at', 'votes', 'comment_count']))
                    expect(res.body.articles[0].topic).to.eql('mitch')
                })
        });


        it('GET: 404 responds with an error when filtering an author with an invalid input', () => {
            return request(app)
                .get('/api/articles?author=12345')
                .expect(404)
                .then(res => {
                    expect(res.body.msg).to.equal('Not found')
                })
        });
        it('GET: 404 responds with an error when filtering a topic which does not exist', () => {
            return request(app)
                .get('/api/articles?topic=notopic')
                .expect(404)
                .then(res => {
                    expect(res.body.msg).to.equal('Not found')
                })
        });
        it('GET: 404 responds with an error when filtering a topic which does not exist', () => {
            return request(app)
                .get('/api/articles?topic=potatoes')
                .expect(404)
                .then(res => {
                    expect(res.body.msg).to.equal('Not found')
                })
        });

        it('GET: 404 responds with an error when filtering a username which exists and a topic which does not', () => {
            return request(app)
                .get('/api/articles?author=icellusedkarstopic=potatoes')
                .expect(404)
                .then(res => {
                    expect(res.body.msg).to.equal('Not found')
                })
        });


        describe('/:article_id', () => {
            it('GET: 200 responds with an article object including the comment count', () => {
                return request(app)
                    .get('/api/articles/2')
                    .expect(200)
                    .then(res => {
                        expect(res.body.article).to.be.an('Object')

                        expect(res.body.article[0]).to.have.all.keys('author', 'title', 'article_id', 'body', 'topic', 'created_at', 'votes', 'comment_count')
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
            it('PATCH: 200 defaults increment to 0 when no body is given in the request', () => {
                return request(app)
                    .patch('/api/articles/5')
                    .send({})
                    .expect(200)
                    .then(res => {
                        // console.log(res.body)
                        res.body.article.forEach(article => expect(article).to.have.all.keys(['author', 'title', 'article_id', 'body', 'topic', 'created_at', 'votes']))
                        expect(res.body.article[0].votes).to.equal(0)
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

            it('POST: 201 responds with the successful posted comment', () => {
                return request(app)
                    .post('/api/articles/2/comments')
                    .send({
                        username: 'butter_bridge', body: "Hello, I'm in the middle of my backend review"
                    })
                    .expect(201)
                    .then(res => {
                        console.log(res.body.comment.body)
                        expect(res.body.comment).to.be.an('Object')
                        expect(res.body.comment).to.have.all.keys('body', 'author', 'votes', 'created_at', 'article_id', 'comment_id')
                        expect(res.body.comment.body).to.eql("Hello, I'm in the middle of my backend review")
                    })
            });
            it('POST: 400 responds with error when no fields are given', () => {
                return request(app)
                    .post('/api/articles/2/comments')
                    .send({})
                    .expect(400)
                    .then(res => {
                        expect(res.body.msg).to.eql('Invalid request: missing required fields')
                    })
            });
            it('POST: 400 responds with error when missing fields', () => {
                return request(app)
                    .post('/api/articles/2/comments')
                    .send({ username: 'butter_bridge' })
                    .expect(400)
                    .then(res => {
                        expect(res.body.msg).to.eql('Invalid request: missing required fields')
                    })
            });
            it('POST: 404 Responds error when id valid but no correspond.', () => {
                return request(app)
                    .post('/api/articles/9999/comments')
                    .send({ username: 'butter_bridge', body: "Hello, I'm in the middle of my backend review" })
                    .expect(404)
                    .then(res => {
                        expect(res.body.msg).to.eql('Invalid request: missing required fields')
                    })
            });
            it('POST: 400 responds with an error when entering an invalid path', () => {
                return request(app)
                    .post('/api/articles/banana/comments')
                    .send({ username: 'butter_bridge', body: "Hello, I'm in the middle of my backend review" })
                    .expect(400)
                    .then(res => {
                        expect(res.body.msg).to.eql('Bad request: missing required fields')
                    })
            });
        });
        it('GET: 200 responds with an array of comments for the given article_id', () => {
            return request(app)
                .get('/api/articles/1/comments')
                .expect(200)
                .then(res => {
                    expect(res.body.comments).to.be.an('Array')
                    res.body.comments.forEach(comments => expect(comments).to.have.all.keys(['body', 'author', 'votes', 'created_at', 'comment_id']))
                })
        });
        it('GET: 200 responds with an array of comments for the given article id sorted by a given column, defaulting to created_at', () => {
            return request(app)
                .get('/api/articles/1/comments?sort_by=author&&order_by=desc')
                .expect(200)
                .then(res => {
                    expect(res.body.comments).to.be.an('Array')
                    res.body.comments.forEach(comments => expect(comments).to.have.all.keys(['body', 'author', 'votes', 'created_at', 'comment_id']))
                    expect(res.body.comments).to.be.sortedBy('author', { descending: true })
                })
        });
        it('GET: 400 responds with an error when entering an invalid path', () => {
            return request(app)
                .get('/api/articles/banana/comments?sort_by=author&&order_by=desc')
                .expect(400)
                .then(res => {
                    expect(res.body.msg).to.eql('Bad request: missing required fields')
                })
        });
        it('GET: 404 Responds error when id valid but no correspond.', () => {
            return request(app)
                .get('/api/articles/9999/comments?sort_by=author&&order_by=desc')
                .expect(404)
                .then(res => {
                    expect(res.body.msg).to.eql('Invalid ID - does not match')
                })
        });
        it('GET: 400 responds with error when inputting invalid sort_by query', () => {
            return request(app)
                .get('/api/articles/1/comments?sort_by=potato')
                .expect(400)
                .then(res => {
                    expect(res.body.msg).to.eql('Invalid request: missing required fields')
                })
        });
        it('GET: 200 will default sorted_by to "created_at" when no sort query is given', () => {
            return request(app)
                .get('/api/articles/1/comments?order_by=desc')
                .expect(200)
                .then(res => {
                    expect(res.body.comments).to.be.an('Array')
                    res.body.comments.forEach(comments => expect(comments).to.have.all.keys(['body', 'author', 'votes', 'created_at', 'comment_id']))
                    expect(res.body.comments).to.be.sortedBy('created_at', { descending: true })
                    expect(res.body.comments[0].created_at).to.eql('2016-11-22T12:36:03.389+00:00')
                })
        });
        it('GET: 200 can sort by ascending when requesting asc in the query', () => {
            return request(app)
                .get('/api/articles/1/comments?order_by=ascending')
                .expect(200)
                .then(res => {
                    expect(res.body.comments).to.be.an('Array')
                    res.body.comments.forEach(comments => expect(comments).to.have.all.keys(['body', 'author', 'votes', 'created_at', 'comment_id']))
                })
        });

        it('GET: 200 can sort by descending when no order_by query is given', () => {
            return request(app)
                .get('/api/articles/1/comments')
                .expect(200)
                .then(res => {
                    console.log(res.body)
                    expect(res.body.comments).to.be.an('Array')
                    expect(res.body.comments[0]).to.have.all.keys(['body', 'author', 'votes', 'created_at', 'comment_id'])
                    expect(res.body.comments[0].created_at).to.eql('2016-11-22T12:36:03.389+00:00')
                })
        });


        it('GET: 200 when article exists but has no associated comments', () => {
            return request(app)
                .get('/api/articles/2/comments')
                .expect(200)
                .then(res => {
                    expect(res.body.comments).to.be.an('Array')
                    // res.body.comments.forEach(comments => expect(comments).to.have.all.keys(['body', 'author', 'votes', 'created_at', 'comment_id']))
                    expect(res.body.comments).to.eql([])
                })

        });





        it('GET: 200 can return all comments when no query is entered with default to sorted by "created at" and ordered by descending', () => {
            return request(app)
                .get('/api/articles/1/comments')
                .expect(200)
                .then(res => {
                    expect(res.body.comments).to.be.an('Array')
                    res.body.comments.forEach(comments => expect(comments).to.have.all.keys(['body', 'author', 'votes', 'created_at', 'comment_id']))
                })
        });
        it('GET: 200 returns an empty body when inputting a valid article_id which does not have comments associated', () => {
            return request(app)
                .get('/api/articles/2/comments')
                .expect(200)
                .then(res => {
                    expect(res.body.comments).to.be.an('Array')
                    // expect(res.body.msg).to.eql('Invalid request: missing required fields')
                })
        });

        it('GET: 200 can sort by votes', () => {
            return request(app)
                .get('/api/articles/1/comments?sort_by=votes')
                .expect(200)
                .then(res => {
                    console.log(res.body)
                    expect(res.body.comments[0].votes).to.eql(100)
                })
        });




    });
    describe('/comments', () => {
        describe('/:comment_id', () => {
            it('PATCH 200 increments the vote when passed a positive number ', () => {
                return request(app)
                    .patch('/api/comments/1')
                    .send({ inc_votes: 1 })
                    .expect(200)
                    .then(res => {
                        console.log(res.body)
                        expect(res.body).to.be.an('Object')
                        expect(res.body.comment).to.have.all.keys('comment_id', 'author', 'article_id', 'votes', 'created_at', 'body')
                        expect(res.body.comment.votes).to.eql(17)
                    })
            });
            it('PATCH: 200 decrements the vote when passed a negative ', () => {
                return request(app)
                    .patch('/api/comments/1')
                    .send({ inc_votes: -30 })
                    .expect(200)
                    .then(res => {
                        expect(res.body.comment).to.be.an('Object')
                        expect(res.body.comment).to.have.all.keys('comment_id', 'author', 'article_id', 'votes', 'created_at', 'body')
                        expect(res.body.comment.votes).to.eql(-14)
                    })
            });

            it('PATCH: 404 Responds error when id valid but no correspond.', () => {
                return request(app)
                    .patch('/api/comments/999')
                    .send({ inc_votes: 1 })
                    .expect(404)
                    .then(res => {
                        expect(res.body.msg).to.equal("Invalid ID - does not match")
                    })
            });
            it('PATCH: 400 Responds error when id valid but no correspond.', () => {
                return request(app)
                    .patch('/api/comments/banana')
                    .send({ inc_votes: 1 })
                    .expect(400)
                    .then(res => {
                        expect(res.body.msg).to.equal("Bad request: missing required fields")
                    })
            });
            it('PATCH: 200 defaults to 0 when no increment value is passed', () => {
                return request(app)
                    .patch('/api/comments/5')
                    .send({})
                    .expect(200)
                    .then(res => {
                        expect(res.body.comment).to.be.an('Object')
                        expect(res.body.comment).to.have.all.keys('comment_id', 'author', 'article_id', 'votes', 'created_at', 'body')
                        expect(res.body.comment.votes).to.eql(0)

                    })
            });
            it('PATCH: 400 responds with error failing schema validation', () => {
                return request(app)
                    .patch('/api/comments/5')
                    .send({ inc_votes: 'Mitch' })
                    .expect(400)
                    .then(res => {
                        expect(res.body.msg).to.equal("Bad request: missing required fields")
                    })
            });

            it('DELETE: 204 responds with an empty body when deleted the comment', () => {
                return request(app)
                    .delete('/api/comments/5')
                    .expect(204)
                    .then(res => {
                        expect(res.body).to.eql({})
                    })
            });
            it('DELETE: 404 responds with an error when ID not found against a comment', () => {
                return request(app)
                    .delete('/api/comments/999')
                    .expect(404)
                    .then(res => {
                        expect(res.body.msg).to.equal('Not Found - invalid ID')
                    })

            });
            it('DELETE: 400 responds with an error ', () => {
                return request(app)
                    .delete('/api/comments/banana')
                    .expect(400)
                    .then(res => {
                        expect(res.body.msg).to.equal('Bad request: missing required fields')
                    })
            });
        });
    });
});


