import pool from "./db";
// import moment from "moment";
class CarModel {
  // Create a car

  static async createNewCar(data) {
    // this.createdOn = moment().format("LLL");
    this.newCar = [
      data.email.trim(),
      // this.createdOn.trim(),
      data.manufacturer.trim(),
      data.model.trim(),
      data.price.trim(),
      data.state.trim(),
      data.status.trim()
    ];
    this.res = await pool.query(
      `INSERT INTO
     cars (
      email,
      manufacturer,
      model,
      price,
      state,
      status,
     )
     VALUES($1, $2, $3, $4, $5, $6) RETURNING *
     `,
      this.newCar
    );
    return [this.res.rows[0]];
  }
}
export default new CarModel();
