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
  }
};

export default Car;
