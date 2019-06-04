import express from "express";
import Users from "../controllers/users";

const { validateBody, schemas } = require("../helpers/routeHelpers");
const router = express.Router();

router.route("/").post(validateBody(schemas.authSchema), Users.create);

export default router;
