import pool from "./db";
import moment from "moment";
class carModel {
  // Create a car

  static async create(data) {
    this.createdOn = moment().format("LLL");

    const newCar = [
      data.email.trim(),
      this.createdOn.trim(),
      data.manufacturer.trim(),
      data.model.trim(),
      data.price.trim(),
      data.state.trim(),
      data.status.trim()
    ];
    this.res = await pool.query(
      `INSERT INTO
     cars (
      "email",
      "createdOn",
      manufacturer,
      model,
      price,
      state,
      status,
     )
     VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *
     `,
      newCar
    );
    return [this.res.rows[0]];
  }
}
export default new carModel();
