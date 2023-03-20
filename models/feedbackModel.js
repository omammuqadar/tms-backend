const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  session_id: { type: String, required: true },
  participant_id: { type: String },
  feedback_message: { type: String },
  feedback_date: { type: String },
},
{
  timestamps: true,
}
);

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
