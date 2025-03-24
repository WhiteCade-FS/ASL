const { Galaxy } = require('../src/models');

// Show all resources
const index = async (req, res) => {
  // Respond with an array and 2xx status code
  const galaxies = await Galaxy.findAll();
    res.status(200).json(galaxies);
}

// Show resource
const show = async (req, res) => {
  // Respond with a single object and 2xx code
  const galaxy = await Galaxy.findByPk(req.params.id);
  res.status(200).json(galaxy);
}

// Create a new resource
const create = async (req, res) => {
  console.log('REQ.BODY:', req.body);
  // Issue a redirect with a success 2xx code
  const galaxy = await Galaxy.create(req.body);
  res.status(201).json(galaxy);
}

// Update an existing resource
const update = async (req, res) => {
  // Respond with a single resource and 2xx code
  const galaxy = await Galaxy.findByPk(req.params.id);
  if (!galaxy) return res.status(404).json({error: 'Galaxy not found'});
  await galaxy.update(req.body);
  res.status(200).json(galaxy);
}

// Remove a single resource
const remove = async (req, res) => {
  // Respond with a 2xx status code and bool
  const galaxy = await Galaxy.findByPk(req.params.id);
  if (!galaxy) return res.status(404).json({error: 'Galaxy not found'});
  await galaxy.destroy();
  res.status(204).send();
}

// Export all controller actions
module.exports = { index, show, create, update, remove }
