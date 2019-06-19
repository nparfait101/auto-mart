import carModel from "../models/carModels";
import { validateCar } from "../helpers/validation";

class Car {
  // create a car
  static async createCar(req, res) {
    const error = validateCar(req.body);
    if (error) {
      res.status(400).send({
        status: 400,
        error: error.details[0].message
      });
    } else {
      const newCar = await carModel.create(req.body);
      res.status(201).send({
        status: 201,
        data: newCar
      });
    }
  }
}
export default Car;
