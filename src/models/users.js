import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "./db";

class User {
  async checkEmail(email) {
    this.user = [];
    this.res = await pool.query("SELECT * FROM users WHERE email = $1", [
      email
    ]);
    if (this.res.rowCount > 0) {
      this.user.push(this.res.rows[0]);
    }
    return this.user;
  }

  async checkEmail2(email) {
    this.res = await pool.query("SELECT * FROM users WHERE email = $1", [
      email
    ]);
    if (this.res.rowCount < 1) {
      return true;
    }
    return false;
  }
  async addNewUser(data) {
    this.salt = await bcrypt.genSalt(8);
    this.password = await bcrypt.hash(data.password, this.salt);
    this.newUser = [
      data.email.trim(),
      data.firstName.trim(),
      data.lastName.trim(),
      this.password.trim(),
      data.address.trim(),
      data.isAdmin.trim()
    ];
    this.res = await pool.query(
      `INSERT INTO
    users(
      email,
      "firstName",
      "lastName",
      password,
      address,
      "isAdmin"
    )VALUES($1,$2,$3,$4,$5,$6) RETURNING *
    `,
      this.newUser
    );
    return [this.res.rows[0]];
  }
}
export default new User();
