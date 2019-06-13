import car from "../models/car";

class Car {
  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} car object
   */
  static create(req, res) {
    if (
      !req.body.email &&
      !req.body.manufacturer &&
      !req.body.model &&
      !req.body.price &&
      !req.body.state &&
      !req.body.status
    ) {
      return res.status(400).send({ message: "All fields are required" });
    }
    const newCar = car.create(req.body);
    return res.status(201).send({ status: 201, data: newCar });
  }
  static getCars(req, res) {
    res.send({
      status: 200,
      data: car
    });
  }
  static getOne(req, res) {
    const oneCar = orders.find(p => p.id === req.params.id);
    if (!oneCar)
      return res
        .status(404)
        .send({ status: 404, Error: "The car with given ID was not found" });
    return res.send({ status: 200, data: oneCar });
  }
}

export default Car;
