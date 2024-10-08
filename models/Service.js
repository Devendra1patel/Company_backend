// models/Service.js
const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, maxlength: 100 },
    slug: { type: String, required: true, unique: true, maxlength: 150 },
    description: { type: String },
    icon_path: { type: String, maxlength: 255 },
  },
  { timestamps: true }
);

// Create index on title
ServiceSchema.index({ title: 1 });

module.exports = mongoose.model('Service', ServiceSchema);
