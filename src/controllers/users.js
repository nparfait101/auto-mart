import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/users";
import _ from "underscore";
import { validateUser, validateLogin } from "../helpers/validation";

class UserController {
  static async registerNewUser(req, res) {
    const error = validateUser(req.body);

    if (error) {
      return res.status(400).send({
        status: 400,
        error: error.details[0].message
      });
    }
    const emaili = await User.checkEmail2(req.body.email);
    if (!emaili) {
      res.status(400).json({
        status: 400,
        error:
          "the email is already taken. the user already exist. register with another unique email"
      });
    } else {
      const addedUser = await User.addNewUser(req.body);
      const newUser = _.omit(addedUser[0], "password");
      const token = jwt.sign({ newUser }, `${process.env.PRIVATE_KEY}`);
      return res.status(201).send({
        status: 201,
        data: [
          {
            token,
            user: newUser
          }
        ]
      });
    }
  }
}
export default UserController;
