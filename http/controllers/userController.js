const User = require('../../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userController = () => {
  return {
    // Register a new user
    register: async (req, res) => {
      try {
        const { username, email, password, first_name, last_name } = req.body;

        // Check if user or email already exists
        const existingUser = await User.findOne({
          $or: [{ email }, { username }],
        });
        if (existingUser) {
          return res
            .status(400)
            .json({ message: 'Username or email already in use.' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({
          username,
          email,
          password_hash,
          first_name,
          last_name,
        });

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully.' });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    },

    // User login
    login: async (req, res) => {
      try {
        const { email, password } = req.body;

        // Find user by email or username
        const user = await User.findOne({
          $or: [{ email: email }, { username: email }],
        });
        if (!user) {
          return res.status(400).json({ message: 'Invalid credentials.' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
          return res.status(400).json({ message: 'Invalid credentials.' });
        }

        // Generate JWT
        const payload = {
          userId: user._id,
          role: user.role,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: '1h',
        });

        res.json({ token, message: 'Logged in successfully.' });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    },

    // Get user profile
    profile: async (req, res) => {
      try {
        const userId = req.user.userId; // From auth middleware

        const user = await User.findById(userId).select('-password_hash');
        if (!user) {
          return res.status(404).json({ message: 'User not found.' });
        }

        res.json(user);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    },

    // Update user profile
    updateProfile: async (req, res) => {
      try {
        const userId = req.user.userId; // From auth middleware
        const updates = req.body;

        // Prevent role/status updates unless admin
        if (req.user.role !== 'admin') {
          delete updates.role;
          delete updates.status;
        }

        const updatedUser = await User.findByIdAndUpdate(userId, updates, {
          new: true,
        }).select('-password_hash');

        res.json({ message: 'Profile updated.', user: updatedUser });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    },

    // Delete user (admin only)
    delete: async (req, res) => {
      try {
        const userId = req.params.id;

        if (req.user.role !== 'admin') {
          return res.status(403).json({ message: 'Access denied.' });
        }

        await User.findByIdAndDelete(userId);

        res.json({ message: 'User deleted.' });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    },

    // Get all users (admin only)
    getAll: async (req, res) => {
      try {
        if (req.user.role !== 'admin') {
          return res.status(403).json({ message: 'Access denied.' });
        }

        const users = await User.find().select('-password_hash');

        res.json(users);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    },
  };
};

module.exports = userController;
