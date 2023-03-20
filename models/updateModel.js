const mongoose = require('mongoose');

const updateSchema = new mongoose.Schema({
  session_id: { type: String, required: true },
  update_message: { type: String },
  update_date: { type: String },
},
{
  timestamps: true,
}
);

const Updates = mongoose.model('Updates', updateSchema);

module.exports = Updates;
