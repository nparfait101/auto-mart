import moment from "moment";
import uuid from "uuid";

class Car {
  /**
   * class constructor
   * @param {object} data
   */
  constructor() {
    this.cars = [];
  }
  /**
   *
   * @returns {object} car object
   */
  create(data) {
    const newCar = {
      id: Math.ceil(Math.random() * 50),
      email: data.email || "",
      createdDate: moment(Date.now()),
      manufacturer: data.manufacturer || "",
      model: data.model || "",
      price: data.price || "",
      state: data.state || "",
      status: data.status || ""
    };
    this.cars.push(newCar);
    return newCar;
  }
  /**
   *
   * @param {uuid} id
   * @returns {object} car object
   */
  findOne(id) {
    return this.cars.find(car => car.id === id);
  }
  /**
   * @returns {object} returns all cars
   */
  findAll() {
    return this.cars;
  }
  /**
   *
   * @param {uuid} id
   * @param {object} data
   */
  update(id, data) {
    const car = this.findOne(id);
    const index = this.cars.indexOf(car);
    this.cars[index].email = data["email"] || car.email;
    this.cars[index].manufacturer = data["manufacurer"] || car.manufacturer;
    this.cars[index].model = data["model"] || car.model;
    this.cars[index].price = data["price"] || car.price;
    this.cars[index].state = data["state"] || car.state;
    this.cars[index].status = data["status"] || car.status;
    this.cars[index].modifiedDate = moment(Date.now());
    return this.cars[index];
  }
  /**
   *
   * @param {uuid} id
   */
  delete(id) {
    const car = this.findOne(id);
    const index = this.cars.indexOf(car);
    this.cars.splice(index, 1);
    return {};
  }
}
export default new Car();
