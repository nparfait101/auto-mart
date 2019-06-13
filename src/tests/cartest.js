import chai from "chai";
import chaiHttp from "chai-http";
import app from "../../app";

const should = chai.should();

chai.use(chaiHttp);
const newCar = {
  email: "abcdef@gmail.com",
  createdDate: 1559673866880,
  manufacturer: "BMW",
  model: "E320",
  price: "19000000",
  state: "new",
  status: "available"
};
const newUser = {
  email: "someone@SpeechGrammarList.com",
  firstname: "heyoo",
  lastname: "bross",
  password: "ghhjkjkk",
  address: "kigali",
  isAdmin: true
};
let token;
describe("cars", () => {
  it("user should be logged in", done => {
    chai
      .request(app)
      .post("/api/v1/users/login")
      .send({ email: "someone@SpeechGrammarList.com", password: "ghhjkjkk" })
      .end((err, res) => {
        token = res.body.token;
        res.should.have.status(200);
        res.body.should.be.an("object");
        done();
      });
  });
  it("It should create new car and return an object with a status code and a new car created", done => {
    chai
      .request(app)
      .post("/api/v1/cars")
      .set("Authorization", token)
      .send(newCar)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.an("object");
        done();
      });
  });
  it("It should return all cars", done => {
    chai
      .request(app)
      .get("/api/v1/cars")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an("object");
        done();
      });
  });
});
