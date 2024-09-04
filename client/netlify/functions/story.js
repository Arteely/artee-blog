const mongoose = require("mongoose");
const Story = require("../../api/models/Story");

module.exports.handler = async (event, context) => {
  const { title, content, author } = JSON.parse(event.body);

  try {
    const newStory = await Story.create({
      title,
      content,
      author,
    });

    return {
      statusCode: 200,
      body: JSON.stringify(newStory),
    };
  } catch (e) {
    console.log(e);
    return {
      statusCode: 400,
      body: JSON.stringify(e),
    };
  }
};
