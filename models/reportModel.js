const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  session_id: { type: String, required: true },
  report_file: { type: String },
  report_date: { type: String },
},
{
  timestamps: true,
}
);

const Reports = mongoose.model('Reports', reportSchema);

module.exports = Reports;
