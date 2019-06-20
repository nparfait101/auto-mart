import chai from "chai";
import chaiHttp from "chai-http";
import app from "../../app";

chai.use(chaiHttp);
const { expect } = chai;
before(done => {
  const userLogin = {
    email: "parfait123@gmail.com",
    password: "12345"
  };
  chai
    .request(app)
    .post("/api/v1/auth/login")
    .send(userLogin)
    .end((err, res) => {
      tokenUser = res.body.data[0].token;
    });
  done();
});

describe("POST /auth/signin", () => {
  it("should return status 200 with when sign in is successful.", done => {
    const logins = {
      email: "parfait123@gmail.com",
      password: "12345"
    };
    chai
      .request(app)
      .post("/api/v1/auth/login")
      .send(logins)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.be.a("number");
        expect(res.body.data).to.be.an("array");
        expect(res.body.data[0])
          .to.have.property("token")
          .to.be.an("string");
      });
    done();
  });
});
