// models/Contact.js
const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, maxlength: 100 },
    email: { type: String, required: true, maxlength: 150 },
    subject: { type: String, maxlength: 200 },
    message: { type: String, required: true },
    processed: { type: Boolean, default: false },
  },
  {
    timestamps: { createdAt: 'received_at', updatedAt: false },
  }
);

// Create index on email
ContactSchema.index({ email: 1 });

module.exports = mongoose.model('Contact', ContactSchema);
