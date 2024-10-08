// models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, maxlength: 50 },
    email: { type: String, required: true, unique: true, maxlength: 100 },
    password_hash: { type: String, required: true },
    first_name: { type: String, maxlength: 50 },
    last_name: { type: String, maxlength: 50 },
    role: {
      type: String,
      enum: ['admin', 'client', 'visitor'],
      default: 'visitor',
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'banned'],
      default: 'active',
    },
  },
  { timestamps: true }
);

// Create index on email
UserSchema.index({ email: 1 });

module.exports = mongoose.model('User', UserSchema);
