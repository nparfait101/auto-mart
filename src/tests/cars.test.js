import chai from "chai";
import chaiHttp from "chai-http";
import app from "../app";

const { expect } = chai;
chai.use(chaiHttp);

/** test for creating a car */
describe("POST /api/v1/cars", () => {
  it("it should create a car", done => {
    chai
      .request(app)
      .post("/api/v1/cars")
      .send({
        email: "something@gmail.com",
        manufacturer: "Toyota",
        model: "Rav4",
        price: "7000000",
        state: "new",
        status: "available"
      })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(Object.keys(res.body.data).length).to.be.above(0);
        done();
      });
  });
});
