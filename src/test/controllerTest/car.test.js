import fs from 'fs';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../app';

const { expect } = chai;

chai.use(chaiHttp);

let myToken;
let adminToken;

before((done) => {
    chai.request(app)
        .post('/api/v2/auth/signup')
        .send({
            firstName: "Desmond",
            lastName: "Doe",
            email: "desmonddoe@gmail.com",
            password: "pass",
            address: "17, Lagos Street, Benin"
        })
        .end((err, res) => {
            if (err) done(err);
            myToken = res.body.data.token;
            done();
        });
});

describe('POST /api/v2/car', () => {
    it('should return a 422 status if form is not a multipart/form-data', (done) => {
        chai.request(app)
            .post('/api/v2/car')
            .set('Authorization', myToken)
            .type('form')
            .field('state', 'used')
            .field('price', 300000)
            .field('manufacturer', 'toyota')
            .field('model', 'corolla')
            .field('bodyType', 'sedan')
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(422);
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.status).to.deep.equal('error');
                done();
            });
    });



    it('should return a 422 error if car state is not specified', (done) => {
        chai.request(app)
            .post('/api/v2/car')
            .type('form')
            .set('Authorization', myToken)
            .set('enctype', 'multipart/form-data')
            .field('price', 300000)
            .field('manufacturer', 'toyota')
            .field('model', 'corolla')
            .field('bodyType', 'sedan')
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(422);
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal('please specify the state of the automobile (new/used)');
                done();
            });
    });

    it('should return a 422 error if car state is neither new nor used', (done) => {
        chai.request(app)
            .post('/api/v2/car')
            .type('form')
            .set('Authorization', myToken)
            .set('enctype', 'multipart/form-data')
            .field('state', 'new and used')
            .field('price', 300000)
            .field('manufacturer', 'toyota')
            .field('model', 'corolla')
            .field('bodyType', 'sedan')
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(422);
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal('please specify the state of the automobile (new/used)');
                done();
            });
    });
});

describe('PATCH /api/v2/car/:carId/status', () => {
    it('should return a 404 error if car does not exist', (done) => {
        chai.request(app)
            .patch('/api/v2/car/300000000/status')
            .set('Authorization', myToken)
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(404);
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal('car not found');
                done();
            });
    });

    it('should return a 404 error if user tries to update a car that is not his', (done) => {
        chai.request(app)
            .patch('/api/v2/car/1/status')
            .set('Authorization', myToken)
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(404);
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal('car not found');
                done();
            });
    });

    it('should return a 422 error if car id is not an integer', (done) => {
        chai.request(app)
            .patch('/api/v2/car/notcar/status')
            .set('Authorization', myToken)
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(422);
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal('invalid car id');
                done();
            });
    });
});


describe('PATCH/api/v2/car/:carId/price', () => {
    it('should return a 404 status if car is not found', (done) => {
        chai.request(app)
            .patch('/api/v2/car/400/price')
            .set('Authorization', myToken)
            .send({
                newPrice: 4000000
            })
            .end((error, res) => {
                if (error) return done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(404);
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal('car not found');
                done();
            });
    });

    it('should return a 422 status if carId is not a valid integer', (done) => {
        chai.request(app)
            .patch('/api/v2/car/urusnsjd/price')
            .set('Authorization', myToken)
            .send({
                newPrice: 4000000
            })
            .end((error, res) => {
                if (error) return done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(422);
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal('invalid car id');
                done();
            });
    });

    it('should return a 404 error if car does not belong to user', (done) => {
        chai.request(app)
            .patch('/api/v2/car/6/price')
            .set('Authorization', myToken)
            .send({
                newPrice: 4000000
            })
            .end((error, res) => {
                if (error) return done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(404);
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal('car not found');
                done();
            });
    });

    it('should return a 422 error if new price was not provided', (done) => {
        chai.request(app)
            .patch('/api/v2/car/5/price')
            .set('Authorization', myToken)
            .end((error, res) => {
                if (error) return done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(422);
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal('new price was not specified');
                done();
            });
    });

    it('should return a 422 error if price is not an integer', (done) => {
        chai.request(app)
            .patch('/api/v2/car/5/price')
            .set('Authorization', myToken)
            .send({
                newPrice: 'hdhdhd'
            })
            .end((error, res) => {
                if (error) return done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(422);
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal('invalid new price');
                done();
            });
    });

    it('should return a 422 error if price has length greater than 12', (done) => {
        chai.request(app)
            .patch('/api/v2/car/5/price')
            .set('Authorization', myToken)
            .send({
                newPrice: 9000000000000000
            })
            .end((error, res) => {
                if (error) return done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(422);
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal('whoa! that new price is quite high');
                done();
            });
    });
});

describe('GET /api/v2/car/:carId', () => {
    it('Should return a 404 status if car does not exist', (done) => {
        chai.request(app)
            .get('/api/v2/car/33333')
            .set('Authorization', myToken)
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(404);
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal('car not found');
                done();
            });
    });

    it('Should return a 422 status if carId is not an integer', (done) => {
        chai.request(app)
            .get('/api/v2/car/string')
            .set('Authorization', myToken)
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(422);
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal('invalid car id');
                done();
            });
    });

    it('Should return a 200 status without an authorization token', (done) => {
        chai.request(app)
            .get('/api/v2/car/4')
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(200);
                expect(res.body).to.have.keys('status', 'data');
                expect(res.body.status).to.deep.equal('success');
                expect(res.body.data).to.be.an('object');
                done();
            });
    });

    it('Should return a 200 status when an authorization token is provided', (done) => {
        chai.request(app)
            .get('/api/v2/car/4')
            .set('Authorization', myToken)
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(200);
                expect(res.body).to.have.keys('status', 'data');
                expect(res.body.status).to.deep.equal('success');
                expect(res.body.data).to.be.an('object');
                done();
            });
    });
});


describe('GET /api/v2/car?status=available', () => {
    it('should return a 403 error if status query is not available', (done) => {
        chai.request(app)
            .get('/api/v2/car')
            .query({ status: 'notavailable' })
            .set('Authorization', myToken)
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(403);
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal('you do not have access to this resource');
                done();
            });
    });

    it('should return available cars when authorization token is not provided', (done) => {
        chai.request(app)
            .get('/api/v2/car')
            .query({ status: 'available' })
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(200);
                expect(res.body).to.have.keys('status', 'data');
                expect(res.body.status).to.deep.equal('success');
                expect(res.body.data).to.be.an('array');
                expect(res.body.data[0]).to.be.an('object');
                done();
            });
    });

    it('should return available cars when authorization token is provided', (done) => {
        chai.request(app)
            .get('/api/v2/car')
            .query({ status: 'available' })
            .set('Authorization', myToken)
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(200);
                expect(res.body).to.have.keys('status', 'data');
                expect(res.body.status).to.deep.equal('success');
                expect(res.body.data).to.be.an('array');
                expect(res.body.data[0]).to.be.an('object');
                done();
            });
    });
});


describe('DELETE /api/v2/car/:carId', () => {

    it('should return a 403 status if user is not an admin', (done) => {
        chai.request(app)
            .delete('/api/v2/car/3')
            .set('Authorization', myToken)
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(403);
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal('you do not have access to this resource');
                done();
            });
    });
});

describe('GET /api/v2/car?status=available&min_price=XXXvalue&max_price=XXXvalue', () => {
    it('should return a 403 status if query is invalid', (done) => {
        chai.request(app)
            .get('/api/v2/car')
            .query({
                status: 'available',
                min_price: 'string',
                max_price: 3000000,
                notValid: 'somestring'
            })
            .set('Authorization', myToken)
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(422);
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal('invalid query: notValid');
                done();
            });
    });
    it('should return a 422 status if min price is not a number', (done) => {
        chai.request(app)
            .get('/api/v2/car')
            .query({
                status: 'available',
                min_price: 'string',
                max_price: 3000000
            })
            .set('Authorization', myToken)
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(422);
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal('invalid minimum price');
                done();
            });
    });

    it('should return a 422 status if max price is not a number', (done) => {
        chai.request(app)
            .get('/api/v2/car')
            .query({
                status: 'available',
                min_price: 3000000,
                max_price: 'another string'
            })
            .set('Authorization', myToken)
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(422);
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal('invalid maximum price');
                done();
            });
    });

    it('should return a 422 state if status is neither new nor used', (done) => {
        chai.request(app)
            .get('/api/v2/car')
            .query({
                status: 'available',
                min_price: 3000000,
                max_price: 9000000,
                state: 'any'
            })
            .set('Authorization', myToken)
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(422);
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal('car state can either be new or used');
                done();
            });
    });

    it('should set minimum pice to zero if not defined', (done) => {
        chai.request(app)
            .get('/api/v2/car')
            .query({
                status: 'available',
                max_price: 30000000
            })
            .set('Authorization', myToken)
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(200);
                expect(res.body).to.have.keys('status', 'data');
                expect(res.body.status).to.deep.equal('success');
                expect(res.body.data[0]).to.be.an('object');
                done();
            });
    });

    it('should set maximum price to Infinity if it not defined', (done) => {
        chai.request(app)
            .get('/api/v2/car')
            .query({
                status: 'available',
                min_price: 1000000
            })
            .set('Authorization', myToken)
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(200);
                expect(res.body).to.have.keys('status', 'data');
                expect(res.body.status).to.deep.equal('success');
                expect(res.body.data[0]).to.be.an('object');
                done();
            });
    });

    it('should return a 403 status if status is not defined and user is not an admin', (done) => {
        chai.request(app)
            .get('/api/v2/car')
            .query({
                min_price: 1000000,
                max_price: 30000000
            })
            .set('Authorization', myToken)
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(403);
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal('you do not have access to this resource');
                done();
            });
    });

    it('should return a 403 status if status is not equal to available', (done) => {
        chai.request(app)
            .get('/api/v2/car')
            .query({
                status: 'notavailable',
                min_price: 1000000,
                max_price: 30000000
            })
            .set('Authorization', myToken)
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(403);
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal('you do not have access to this resource');
                done();
            });
    });

    it('should return a 403 status no query parameter is supplied and user is not an admin', (done) => {
        chai.request(app)
            .get('/api/v2/car')
            .set('Authorization', myToken)
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(403);
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal('you do not have access to this resource');
                done();
            });
    });

    it('should return a 200 status even if user is not authenticated', (done) => {
        chai.request(app)
            .get('/api/v2/car')
            .query({
                status: 'available',
                min_price: 200000,
                max_price: 8000000,
                state: 'new'
            })
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(200);
                expect(res.body).to.have.keys('status', 'data');
                expect(res.body.status).to.deep.equal('success');
                expect(res.body.data[0]).to.be.an('object');
                done();
            });
    });

    it('should return a 404 status even if no car matches search condition', (done) => {
        chai.request(app)
            .get('/api/v2/car')
            .query({
                status: 'available',
                min_price: 10000000,
                max_price: 12000000,
                state: 'new'
            })
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(404);
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal('we could not find any car that matches your search');
                done();
            });
    });
});