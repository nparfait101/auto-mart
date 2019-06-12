import chai from "chai";
import chaiHttp from "chai-http";
import app from "../../app";

const should = chai.should();
import Order from "../models/order";
import Car from "../models/car";

chai.use(chaiHttp);
const newCar = {
  email: "abcdef@gmail.com",
  manufacturer: "BMW",
  model: "E320",
  price: "9000000",
  state: "new",
  status: "available"
};

describe("POST /cars", () => {
  it("It should create new car and return an object with a status code and a new car created", done => {
    chai
      .request(app)
      .post("/api/v1/cars")
      .send(newCar)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.an("object");
        done();
      });
  });
});

describe("GET /cars", () => {
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

describe("GET /cars/<car-id>", () => {
  it("It should fetch car by id ", done => {
    chai
      .request(app)
      .get("/api/v1/cars/1")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an("object");
        done();
      });
  });
  it("Once provided wrong ID, It should say that it is invalid", done => {
    chai
      .request(app)
      .get("/api/v1/cars/dghds4")
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.an("object");
        done();
      });
  });
});
