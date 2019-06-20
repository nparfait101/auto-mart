import CarModel from "../models/carModels";
import { validateCar } from "../helpers/validation";

class Car {
  // create a car
  static async createCar(req, res) {
    try {
      // const error = validateCar(req.body);
      // if (!error) {
      const newCar = await CarModel.createNewCar(req.body);
      console.log(">>>>>>", newCar);

      res.status(201).send({
        status: 201,
        data: newCar
      });
      // } else {
      //   res.status(400).send({
      //     status: 400,
      //     error: error.details[0].message
      //   });
      // }
    } catch (error) {
      console.log(error);
    }
  }
}
export default Car;
