// models/PortfolioProject.js
const mongoose = require('mongoose');

const PortfolioProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, maxlength: 150 },
    slug: { type: String, required: true, unique: true, maxlength: 200 },
    description: { type: String },
    client_name: { type: String, maxlength: 100 },
    project_url: { type: String, maxlength: 255 },
    image_path: { type: String, maxlength: 255 },
  },
  { timestamps: true }
);

// Create index on title
PortfolioProjectSchema.index({ title: 1 });

module.exports = mongoose.model('PortfolioProject', PortfolioProjectSchema);
