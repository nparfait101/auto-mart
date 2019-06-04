import chai from "chai";
import chaiHttp from "chai-http";
import app from "../app.js";

const { expect } = chai;
chai.use(chaiHttp);

describe("POST /api/v1/users", () => {
  it("it should create a user", done => {
    chai
      .request(app)
      .post("/api/v1/users")
      .send({
        email: "something@gmail.com",
        firstname: "ntagungira",
        lastname: "parfait",
        password: "hdbgfmn",
        address: "12345"
      })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(Object.keys(res.body.data).length).to.be.above(0);
        done();
      });
  });
});
