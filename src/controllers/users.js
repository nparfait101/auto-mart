import users from "../models/users";
import Helper from "../helpers/validation";
import bcrypt from "bcrypt";
// create a user
const createUser = (req, res) => {
  const user = Helper.isUserValid(req.body);
  if (user.error != null) {
    const errors = [];
    for (let index = 0; index < user.error.details.length; index += 1) {
      errors.push(user.error.details[index].message.split('"').join(" "));
    }
    return res.status(422).send({ status: 422, Error: errors });
  }

  const newUser = {
    id: users.length + 1,
    email: req.body.email,
    firstname: req.body.first_name,
    lastname: req.body.last_name,
    password: bcrypt.hashSync(req.body.password, 8),
    address: req.body.address,
    isAdmin: req.body.is_admin
  };
  users.push(newUser);
  return res.status(201).send({ status: 201, data: newUser });
};

export default createUser;
