/* eslint-disable */
import sinon from 'sinon';
import chai from 'chai';
import chaiHttp from 'chai-http';

import { Response } from 'superagent';
import app from '../../app';
import User from '../../database/models/User';

chai.use(chaiHttp);

const { expect } = chai;

describe('Tests login user', () => {
  describe('If the request is made with an invalid user or password', () => {
    let chaiHttpResponse: Response;

    before(() => {
      sinon.stub(User, 'findOne').resolves(false as any);
    });

    after(() => {
      (User.findOne as sinon.SinonStub).restore();
    });

    it('Return the status code 404', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: 'invalido@gmail.com',
        password: '12345678'
      });
      expect(chaiHttpResponse).to.have.status(404);
    });

    it('Return an object with a key "error"', () => {
      expect(chaiHttpResponse.body).to.have.key('error');
    })

    it('The error is "Email or password incorrect"', () => {
      expect(chaiHttpResponse.body.error).to.be.equal('Email or password incorrect');
    })
  });
});