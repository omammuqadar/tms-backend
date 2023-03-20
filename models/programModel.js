const mongoose = require('mongoose');

const programSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User', 
  },
  name: { type: String, required: [true,'Please add a name'] },
  description: { type: String },
  start_date: { type: String },
  end_date: { type: String }
},
{
  timestamps: true,
}
);

const Programs = mongoose.model('Programs', programSchema);

module.exports = Programs;
