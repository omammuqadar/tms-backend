const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  session_id: { type: String, required: true },
  video_file: { type: String },
  video_date: { type: String },
},
{
  timestamps: true,
}
);

const Videos = mongoose.model('Videos', videoSchema);

module.exports = Videos;
