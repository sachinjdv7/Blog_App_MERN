const AuthService = require("../services/user.service.js");

const AuthServiceInstance = new AuthService();

const postSigup = async (req, res) => {
  try {
    const data = req.body;
    const docSignup = await AuthServiceInstance.register(data);
    // console.log(data);
    return res.status(200).json(docSignup);
  } catch (error) {
    if (error.code === 11000) {
      res.status(409).json({
        message: "Failed to create new user",
        reason: "User already exists in DB",
      });
    } else {
      res.status(500).json({ message: "Failed to create new user", error });
    }
  }
};

const postLogin = async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    const result = await AuthServiceInstance.verifyPassword(data);
    console.log("result", result);
    if (result.isLoggedIn) {
      res.cookie("token", result.jwt, {
        maxAge: 1000 * 60 * 60,
      });
      res.status(200).json(result);
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    res.status(500).json({ message: "Unalbe to to login user", error });
  }
};

module.exports = {
  postSigup,
  postLogin,
};
