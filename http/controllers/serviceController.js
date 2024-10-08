const Service = require('../../models/Service');

const serviceController = () => {
  return {
    // Create a new service
    create: async (req, res) => {
      try {
        const { title, slug, description, icon_path } = req.body;

        // Check if a service with the same slug already exists
        const existingService = await Service.findOne({ slug });
        if (existingService) {
          return res.status(400).json({ message: 'Slug already in use.' });
        }

        const newService = new Service({
          title,
          slug,
          description,
          icon_path,
        });

        const savedService = await newService.save();

        res.status(201).json({
          message: 'Service created successfully.',
          service: savedService,
        });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    },

    // Get all services
    getAll: async (req, res) => {
      try {
        const services = await Service.find();
        res.json(services);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    },

    // Get a single service by ID
    getById: async (req, res) => {
      try {
        const service = await Service.findById(req.params.id);
        if (!service) {
          return res.status(404).json({ message: 'Service not found.' });
        }
        res.json(service);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    },

    // Get a single service by slug
    getBySlug: async (req, res) => {
      try {
        const service = await Service.findOne({ slug: req.params.slug });
        if (!service) {
          return res.status(404).json({ message: 'Service not found.' });
        }
        res.json(service);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    },

    // Update a service
    update: async (req, res) => {
      try {
        const updates = req.body;
        const serviceId = req.params.id;

        // Check if the slug is being updated to a slug that already exists
        if (updates.slug) {
          const existingService = await Service.findOne({
            slug: updates.slug,
            _id: { $ne: serviceId },
          });
          if (existingService) {
            return res.status(400).json({ message: 'Slug already in use.' });
          }
        }

        const updatedService = await Service.findByIdAndUpdate(
          serviceId,
          updates,
          { new: true }
        );
        if (!updatedService) {
          return res.status(404).json({ message: 'Service not found.' });
        }

        res.json({
          message: 'Service updated successfully.',
          service: updatedService,
        });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    },

    // Delete a service
    delete: async (req, res) => {
      try {
        const serviceId = req.params.id;

        const deletedService = await Service.findByIdAndDelete(serviceId);
        if (!deletedService) {
          return res.status(404).json({ message: 'Service not found.' });
        }

        res.json({ message: 'Service deleted successfully.' });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    },
  };
};

module.exports = serviceController;
