const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Post = require("../../api/models/Post");
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

  const { id, title, summary, content } = JSON.parse(event.body);

  try {
    const decoded = jwt.verify(token, secret);
    const postDoc = await Post.findById(id);

    if (postDoc.author.toString() === decoded.id) {
      postDoc.title = title;
      postDoc.summary = summary;
      postDoc.content = content;
      await postDoc.save();

      return {
        statusCode: 200,
        body: JSON.stringify(postDoc),
      };
    } else {
      return {
        statusCode: 403,
        body: JSON.stringify("Forbidden"),
      };
    }
  } catch (e) {
    console.log(e);
    return {
      statusCode: 400,
      body: JSON.stringify(e),
    };
  }
};
