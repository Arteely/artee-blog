const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const storySchema = new Schema({
  title: String,
  content: String,
  cover: String,
  youtubeEmbed: String,
  twitterEmbed: String,
  tag: String,
  author: { type: Schema.Types.ObjectId, ref: 'User' },
}, {
  timestamps: true,
});

const StoryModel = model('Story', storySchema);

module.exports = StoryModel;
