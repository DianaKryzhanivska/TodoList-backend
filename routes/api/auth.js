const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/auth");
const validateBody = require("../../middlewares/validateBody");
const { schemas } = require("../../models/users");

router.post(
  "/user/register",
  validateBody(schemas.registerSchema),
  ctrl.register
);

module.exports = router;
