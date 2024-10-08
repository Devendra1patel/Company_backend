const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/services', require('./routes/serviceRoutes'));

// app.use('/api/users', require('./routes/users'));
// app.use('/api/contacts', require('./routes/contacts'));
// app.use('/api/services', require('./routes/services'));
// app.use('/api/portfolio-projects', require('./routes/portfolioProjects'));
// app.use('/api/social-media-links', require('./routes/socialMediaLinks'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
