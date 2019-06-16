import chai from "chai";
import chaiHttp from "chai-http";
import app from "../../app";
import moment from "moment";
import Car from "../models/car";

const should = chai.should();

chai.use(chaiHttp);

const newCar = {
  email: "someone@gmail.com",
  manufacturer: "BMW",
  model: "E320",
  price: "19000000",
  state: "New",
  status: "Available"
};

const newUser = {
  email: "someone@gmail.com",
  firstname: "heyoo",
  lastname: "bross",
  password: "password",
  address: "kigali",
  isAdmin: true
};
let token;

describe("POST /cars", () => {
  it("user should be logged in", done => {
    chai
      .request(app)
      .post("/api/v1/users/login")
      .send({ email: "someone@gmail.com", password: "password" })
      .end((err, res) => {
        token = res.body.token;
        res.should.have.status(200);
        res.body.should.be.an("object");
        done();
      });
  });

  it("It should add new car and return an object with a status code and a new car created", done => {
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
  it("It should get car by id ", done => {
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
      .get("/api/v1/cars/125x")
      .end((err, res) => {
        res.should.have.status(404);
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

  it("It should delete data and return deleted data", done => {
    chai
      .request(app)
      .delete("/api/v1/cars/1")
      .set("Authorization", token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an("object");
        done();
      });
  });
});
