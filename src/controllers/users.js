import users from "../models/users";
import bcrypt from "bcrypt";

class Users {
  // Check if the User exit
  static checkUsers(userEmail) {
    let checkUsers = {};
    for (const key in users) {
      if (users[key].email === userEmail) {
        checkUsers = users[key];
        break;
      }
    }
    return checkUsers;
  }
  // Create a user
  static create(req, res) {
    const newUser = {
      id: Math.ceil(Math.random() * 50),
      email: req.body.email,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: bcrypt.hashSync(req.body.password, 8),
      address: req.body.address
    };

    users.push(newUser);

    const isCreated = Users.checkUsers(newUser.email);
    if (Object.keys(isCreated).length > 0) {
      return res.status(201).json({
        status: 201,
        data: isCreated
      });
    }

    return res.status(400).json({
      status: 400,
      error: "user not created"
    });
  }
}
export default Users;
