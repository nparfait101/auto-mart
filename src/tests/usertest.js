import chai from "chai";
import chaiHttp from "chai-http";
import app from "../../app";
import moment from "moment";
import singleUser from "../models/users";

const should = chai.should();

chai.use(chaiHttp);

// describe("POST /users", () => {
//   it("It should add new user and return an object with a status code and a new user created", done => {
//     const newUser = {
//       email: "someone@SpeechGrammarList.com",
//       first_name: "heyoo",
//       last_name: "bross",
//       password: "ghhjkjkk",
//       address: "kigali",
//       is_admin: true
//     };

//     chai
//       .request(app)
//       .post("/api/v1/users")
//       .send(user)
//       .end((err, res) => {
//         res.should.have.status(201);
//         res.body.should.be.an("object");
//         done();
//       });
//   });
// });
