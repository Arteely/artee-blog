const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../api/models/User");
const secret = process.env.secretKEY;

module.exports.handler = async (event, context) => {
  const { username, password } = JSON.parse(event.body);
  const UserDoc = await User.findOne({ username });

  if (!UserDoc) {
    return {
      statusCode: 400,
      body: JSON.stringify("Wrong Credentials"),
    };
  }

  const passOK = bcrypt.compareSync(password, UserDoc.password);
  if (passOK) {
    const token = jwt.sign({ username, id: UserDoc._id }, secret);
    return {
      statusCode: 200,
      headers: {
        "Set-Cookie": `token=${token}; HttpOnly; Path=/`,
      },
      body: JSON.stringify({ id: UserDoc._id, username }),
    };
  } else {
    return {
      statusCode: 400,
      body: JSON.stringify("Wrong Credentials"),
    };
  }
};
