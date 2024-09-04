const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const salt = bcrypt.genSaltSync(10);

module.exports.handler = async (event, context) => {
  const { username, password, email, firstname, lastname } = JSON.parse(event.body);

  try {
    const UserDoc = await User.create({
      username,
      firstname,
      lastname,
      email,
      password: bcrypt.hashSync(password, salt),
    });
    return {
      statusCode: 200,
      body: JSON.stringify(UserDoc),
    };
  } catch (e) {
    console.log(e);
    return {
      statusCode: 400,
      body: JSON.stringify(e),
    };
  }
};
