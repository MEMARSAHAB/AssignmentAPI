const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');

//Assertion Style
chai.should();

chai.use(chaiHttp);

describe('Gramo API Testing', () => {
  /**
   * Testing GET (by id) route
   */
  describe('GET /reports?reportID', () => {
    it('It should GET a report by ID', done => {
      const reportID = '612c6edb45062c974be046a1';
      chai
        .request(server)
        .get('/reports')
        .query({
          reportID,
        })
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object');
          response.body.should.have.property('_id');
          response.body.should.have.property('_id').eq(reportID);
          done();
        });
    });

    it('It should NOT GET a report becouse no report of this id exist', done => {
      const reportID = '6078157e8f696a44e80cac09';
      chai
        .request(server)
        .get('/reports')
        .query({
          reportID,
        })
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.be.a('object');
          done();
        });
    });
  });

  /**
   * Test the POST route
   */
  describe('POST /reports', () => {
    it('It should POST a new report', done => {
      const reportDetails = {
        cmdtyName: 'Patato',
        cmdtyID: 'cmdty-3',
        marketID: 'market-3',
        marketName: 'VNM',
        user: 'user-1',
        priceUnit: 'Pack',
        price: 2000,
        convFctr: 100,
      };
      chai
        .request(server)
        .post('/reports')
        .send({ reportDetails })
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object');
          response.body.should.have.property('reportID');
          done();
        });
    });
  });
});
