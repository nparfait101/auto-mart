import chai from "chai";
import chaiHttp from "chai-http";
import app from "../../app";
import moment from "moment";
import Order from "../models/order";

const should = chai.should();

chai.use(chaiHttp);

const newOrder = {
  price: "5000000",
  price_offered: "4000000"
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

describe("POST /orders", () => {
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

  it("It should add new order and return an object with a status code and a new order created", done => {
    chai
      .request(app)
      .post("/api/v1/orders")
      .set("Authorization", token)
      .send(newOrder)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.an("object");
        done();
      });
  });
  it("It should get order by id ", done => {
    chai
      .request(app)
      .get("/api/v1/orders/1")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an("object");
        done();
      });
  });
  it("Once provided wrong ID, It should say that it is invalid", done => {
    chai
      .request(app)
      .get("/api/v1/orders/125x")
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.an("object");
        done();
      });
  });
  it("It should return all orders", done => {
    chai
      .request(app)
      .get("/api/v1/orders")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an("object");
        done();
      });
  });

  it("It should delete data and return deleted data", done => {
    chai
      .request(app)
      .delete("/api/v1/orders/1")
      .set("Authorization", token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an("object");
        done();
      });
  });
});
