// models/SocialMediaLink.js
const mongoose = require('mongoose');

const SocialMediaLinkSchema = new mongoose.Schema({
  platform_name: { type: String, required: true, maxlength: 50 },
  profile_url: { type: String, required: true, maxlength: 255 },
  icon_path: { type: String, maxlength: 255 },
  display_order: { type: Number, default: 0 },
});

module.exports = mongoose.model('SocialMediaLink', SocialMediaLinkSchema);
