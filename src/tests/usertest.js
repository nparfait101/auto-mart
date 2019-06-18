import chai from "chai";
import chaiHttp from "chai-http";
import app from "../../app";
import moment from "moment";
import singleUser from "../models/users";

const should = chai.should();

chai.use(chaiHttp);
