const mongoose = require("mongoose");
const Post = require("../../api/models/Post");

module.exports.handler = async (event, context) => {
  const { id } = event.queryStringParameters;

  try {
    const postDoc = await Post.findById(id);
    return {
      statusCode: 200,
      body: JSON.stringify(postDoc),
    };
  } catch (e) {
    console.log(e);
    return {
      statusCode: 400,
      body: JSON.stringify(e),
    };
  }
};
