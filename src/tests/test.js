import chai from "chai";
import chaiHttp from "chai-http";
import app from "../../app";

const should = chai.should();
import Order from "../models/order";
import Car from "../models/car";

chai.use(chaiHttp);

const newOrder = {
  price: "5000000",
  price_offered: "4000000"
};

describe("POST /orders", () => {
  it("It should add new order and return an object with a status code and a new order created", done => {
    chai
      .request(app)
      .post("/api/v1/orders/")
      .send(newOrder)
      .end((err, res) => {
        res.should.have.status(201);
        res.should.have.status(201);
        res.body.should.be.an("object");
        done();
      });
  });
});

describe("GET /orders/<order-id>", () => {
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
});

describe("/GET Orders", () => {
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
});

describe("PATCH /orders/<order-id>/price_offered", () => {
  it("It should update only the price offered and return object with updated data", done => {
    chai
      .request(app)
      .patch("/api/v1/orders/1/price_offered")
      .send(newPrice_offered)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an("object");
        res.body.should.have.property("data").be.a("array");
        done();
      });
  });
});

describe("DELETE /orders/<order-id>", () => {
  it("It should delete data and return deleted data", done => {
    chai
      .request(app)
      .delete("/api/v1/orders/1")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an("object");
        done();
      });
  });
});
