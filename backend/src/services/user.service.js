const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("../models/user.model");

class UserService {
  secret = process.env.JWT_SECRET;
  register = async (data) => {
    try {
      const { email, username, password } = data;
      const hashedPassword = await this.encryptPassword(password);
      const newUser = new Users({
        email,
        username,
        password: hashedPassword,
      });
      const result = await newUser.save();
      return result;
    } catch (error) {
      throw error;
    }
  };

  verifyPassword = async (data) => {
    const { username } = data;
    const user = await Users.findOne({ username });
    console.log("user............", user);
    if (!user) {
      return {
        isLoggedIn: false,
      };
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      return {
        isLoggedIn: false,
      };
    }
    return { isLoggedIn: true, jwt: this.generateToken(user._id) };
  };

  encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt();
    console.log(salt);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log(hashedPassword);
    return hashedPassword;
  };

  generateToken = (userId) => {
    try {
      const paylod = { userId };
      const options = { expiresIn: "1h" };
      const token = jwt.sign(paylod, this.secret, options);
      return token;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = UserService;
