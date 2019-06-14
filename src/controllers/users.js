import singleUser from "../models/users";
import Helper from "../helpers/validation";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
class User {
  // create a user
  createUser(req, res) {
    const user = Helper.isUserValid(req.body);
    if (user.error != null) {
      const errors = [];
      for (let index = 0; index < user.error.details.length; index += 1) {
        errors.push(user.error.details[index].message.split('"').join(" "));
      }
      return res.status(422).send({ status: 422, Error: errors });
    }

    const newUser = {
      id: singleUser.length + 1,
      email: req.body.email,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      password: bcrypt.hashSync(req.body.password, 8),
      address: req.body.address,
      is_admin: req.body.is_admin
    };
    singleUser.push(newUser);
    return res.status(201).send({ status: 201, data: newUser });
  }
  Login(req, res) {
    const user = {
      email: req.body.email,
      password: req.body.password
    };
    const registeredUser = singleUser.find(item => item.email === user.email);

    if (!registeredUser) {
      return res.status(400).send({
        status: 400,
        error: "Invalid email"
      });
    }
    // compare passowrd with bcrypt
    const verify = bcrypt.compare(user.password, registeredUser.password);

    // if passwowrd match, auth user
    if (verify) {
      const token = jwt.sign(
        { user: registeredUser.id, type: registeredUser.is_admin },
        "ntagungira"
      );
      return res.status(200).send({
        status: 200,
        token: token
      });
    }
    return res.status(400).send({
      status: 400,
      error: "Invalid password"
    });
  }
}
const my_user = new User();
export default my_user;
