const { postSigup, postLogin } = require("../controllers/user.controller");
const { validateSchema } = require("../middlewares/validate.middleware");
const {
  loginBodyValidationSchema,
} = require("../validations/login.validator.js");
const { userValidationSchema } = require("../validations/user.validator.js");
const router = require("express").Router();

router.post("/signup", validateSchema(userValidationSchema), postSigup);
router.post("/login", validateSchema(loginBodyValidationSchema), postLogin);

module.exports = router;
