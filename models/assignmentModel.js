const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  session_id: { type: String, required: true },
  participant_id: { type: String},
  assignment_file: { type: String},
  submission_date: { type: String, required: true  },
  marks: { type: String, required: true  },
},
{
  timestamps: true,
}
);

const Assignments = mongoose.model('Assignments', assignmentSchema);

module.exports = Assignments;
