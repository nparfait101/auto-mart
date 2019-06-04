import car from "../models/car";

const Car = {
  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} car object
   */
  create(req, res) {
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
  },
  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} cars array
   */
  getAll(req, res) {
    const cars = car.findAll();
    return res.status(200).send({ status: 200, data: cars });
  },
  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} car object
   */
  getOne(req, res) {
    const getCar = car.findOne(req.params.id);
    if (!getCar) {
      return res.status(404).send({ message: "car not found" });
    }
    return res.status(200).send({ status: 200, data: getCar });
  },
  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} updated car
   */
  update(req, res) {
    const updateCar = car.findOne(req.params.id);
    if (!updateCar) {
      return res.status(404).send({ status: 404, message: "car not found" });
    }
    const updatedCar = updateCar.update(req.body);
    return res.status(200).send({ status: 200, data: updatedCar });
  },
  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {void} return status code 204
   */
  delete(req, res) {
    const car = car.findOne(req.params.id);
    if (!car) {
      return res.status(404).send({ message: "reflection not found" });
    }
    const carToDelete = car.delete(req.params.id);
    return res.status(204).send(carToDelete);
  }
};

export default Car;
