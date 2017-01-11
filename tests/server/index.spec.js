'use strict';

const app = require('../../server');
const chai = require('chai');
const request = require('supertest');

const expect = chai.expect;

describe('Express App', () => {
  it('should run without throwing errors', done => {
    request(app)
      .get('/')
      .expect(200, done);
  });
});
