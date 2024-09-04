const mongoose = require("mongoose");
const Story = require("./models/Story");

module.exports.handler = async (event, context) => {
  const { id } = event.queryStringParameters;

  try {
    const storyDoc = await Story.findById(id);
    return {
      statusCode: 200,
      body: JSON.stringify(storyDoc),
    };
  } catch (e) {
    console.log(e);
    return {
      statusCode: 400,
      body: JSON.stringify(e),
    };
  }
};
