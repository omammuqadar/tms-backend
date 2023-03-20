const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  program_id: { type: String, required: true },
  center: { type: String, required: true  },
  start_date: { type: String, required: true  },
  end_date: { type: String, required: true  },
  trainer_id: { type: String },
  monitor_id: { type: String },
  participant_ids: { type: Array},
},
{
  timestamps: true,
}
);

const Sessions = mongoose.model('Sessions', sessionSchema);

module.exports = Sessions;
