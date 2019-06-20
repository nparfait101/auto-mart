import chai from "chai";
import chaiHttp from "chai-http";
import app from "../../app";
// import pool from "../models/db";

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
// describe("POST auth/signup", () => {
//   it("should return status 201 when new user record is created", done => {
//     const user = {
//       email: "someone@gmail.com",
//       firstname: "heyoo",
//       lastname: "bross",
//       password: "password",
//       address: "kigali",
//       isadmin: true
//     };
//     chai
//       .request(app)
//       .post("/api/v1/auth/signup")
//       .send(user)
//       .end((err, res) => {
//         expect(res).to.have.status(201);
//       });
//     done();
//   });
// describe("User authentication", () => {
//   /* Sign-up */
//   describe("Sign-up", () => {
//     describe("POST /api/v1/auth/signup", () => {
//       // test 1
//       it("should return the status code and the information of the created user", done => {
//         chai
//           .request(app)
//           .post("/api/v1/auth/signup")
//           .send({
//             email: "someone@gmail.com",
//             firstname: "heyoo",
//             lastname: "bross",
//             password: "password",
//             address: "kigali",
//             isadmin: true
//           })
//           .end((err, res) => {
//             expect(res.status).to.equal(201);
//             // expect(Object.keys(res.body.data).length).to.be.above(0);
//             done();
//           });
//       });
// before(done => {
//   const userLogin = {
//     email: "someone@gmail.com",
//     password: "password"
//   };

//   chai
//     .request(app)
//     .post("/api/v1/auth/login")
//     .send(userLogin)
//     .end((err, res) => {
//       tokenUser = res.body.data[0].token;
//     });
//   done();
// });

// it("It should add new order and return an object with a status code and a new order created", done => {
//   chai
//     .request(app)
//     .post("/api/v1/auth/signup")
//     .send(newUser)
//     .end((err, res) => {
//       res.should.have.status(201);
//       res.body.should.be.an("object");
//       done();
//     });
// });
// it("user should be logged in", done => {
//   chai
//     .request(app)
//     .post("/api/v1/users/login")
//     .send({ email: "someone@gmail.com", password: "password" })
//     .end((err, res) => {
//       token = res.body.token;
//       res.should.have.status(200);
//       res.body.should.be.an("object");
//       done();
//     });
// });

// it("It should add new order and return an object with a status code and a new order created", done => {
//   chai
//     .request(app)
//     .post("/api/v1/orders")
//     .set("Authorization", token)
//     .send(newOrder)
//     .end((err, res) => {
//       res.should.have.status(201);
//       res.body.should.be.an("object");
//       done();
//     });
// });
// it("It should get order by id ", done => {
//   chai
//     .request(app)
//     .get("/api/v1/orders/1")
//     .end((err, res) => {
//       res.should.have.status(200);
//       res.body.should.be.an("object");
//       done();
//     });
// });
// it("Once provided wrong ID, It should say that it is invalid", done => {
//   chai
//     .request(app)
//     .get("/api/v1/orders/125x")
//     .end((err, res) => {
//       res.should.have.status(404);
//       res.body.should.be.an("object");
//       done();
//     });
// });
// it("It should return all orders", done => {
//   chai
//     .request(app)
//     .get("/api/v1/orders")
//     .end((err, res) => {
//       res.should.have.status(200);
//       res.body.should.be.an("object");
//       done();
//     });
// });

// it("It should delete data and return deleted data", done => {
//   chai
//     .request(app)
//     .delete("/api/v1/orders/1")
//     .set("Authorization", token)
//     .end((err, res) => {
//       res.should.have.status(200);
//       res.body.should.be.an("object");
//       done();
//     });
// });
// });
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
