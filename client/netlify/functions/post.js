const mongoose = require("mongoose");
const Post = require("../../api/models/Post");

module.exports.handler = async (event, context) => {
  const { title, summary, content, cover, author } = JSON.parse(event.body);

  try {
    const newPost = await Post.create({
      title,
      summary,
      content,
      cover,
      author,
    });

    return {
      statusCode: 200,
      body: JSON.stringify(newPost),
    };
  } catch (e) {
    console.log(e);
    return {
      statusCode: 400,
      body: JSON.stringify(e),
    };
  }
};
