const jwt = require("jsonwebtoken");
const User = require("../../api/models/User");
const secret = process.env.secretKEY;

module.exports.handler = async (event, context) => {
  const { cookies } = event.headers;
  const token = cookies && cookies.split('; ').find(row => row.startsWith('token=')).split('=')[1];

  if (!token) {
    return {
      statusCode: 401,
      body: JSON.stringify("Unauthorized"),
    };
  }

  try {
    const decoded = jwt.verify(token, secret);
    const { username, id } = decoded;
    
    return {
      statusCode: 200,
      body: JSON.stringify({ username, id }),
    };
  } catch (e) {
    console.log(e);
    return {
      statusCode: 401,
      body: JSON.stringify("Invalid token"),
    };
  }
};
