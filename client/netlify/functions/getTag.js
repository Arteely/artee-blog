const mongoose = require("mongoose");
const Tag = require("./models/Tag");

module.exports.handler = async (event, context) => {
  const { tagName } = event.queryStringParameters;

  try {
    const tag = await Tag.findOne({ name: tagName });
    return {
      statusCode: 200,
      body: JSON.stringify(tag),
    };
  } catch (e) {
    console.log(e);
    return {
      statusCode: 400,
      body: JSON.stringify(e),
    };
  }
};
