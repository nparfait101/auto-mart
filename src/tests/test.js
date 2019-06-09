import chai from "chai";
import chaiHttp from "chai-http";
import app from "../app";

const should = chai.should();
import Order from "../models/order";
import Car from "../models/car";

chai.use(chaiHttp);

const newOrder = {
  status: "Available",
  price: "5000000",
  price_offered: "4000000"
};
const newCar = {
  email: "abcdef@gmail.com",
  manufacturer: "BMW",
  model: "E320",
  price: "9000000",
  state: "new",
  status: "available"
};

const newName = {
  reason: "not the owner",
  dedscription: "stolen"
};

describe("POST /orders", () => {
  it("It should add new order and return an object with a status code and a new order created", done => {
    chai
      .request(app)
      .post("/api/v1/orders/")
      .send(newOrder)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.data.should.all.have.property("status", newOrder.status);
        res.body.data.should.all.have.property("price", newOrder.price);
        res.body.data.should.all.have.property(
          "price_offered",
          newParty.price_offered
        );
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

describe("PATCH /orders/<order-id>/price", () => {
  it("It should update only the price offered and return object with updated data", done => {
    chai
      .request(app)
      .patch("/api/v1/orders/1/price_offered")
      .send(newName)
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

describe("POST /cars", () => {
  it("It should create new car and return an object with a status code and a new car created", done => {
    chai
      .request(app)
      .post("/api/v1/cars")
      .send(newOffice)
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
