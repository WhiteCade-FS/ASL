const { Planet } = require('../src/models');

// Show all resources
const index = async (req, res) => {
  // Respond with an array and 2xx status code
  const planets = await Planet.findAll({
    include: ['Stars']
  });
    res.status(200).json(planets);
}

// Show resource
const show = async (req, res) => {
  // Respond with a single object and 2xx code
  const planet = await Planet.findByPk(req.params.id);
  res.status(200).json(planet);
}

// Create a new resource
const create = async (req, res) => {
  console.log('REQ.BODY:', req.body);
  // Issue a redirect with a success 2xx code
  const planet = await Planet.create(req.body);
  res.status(201).json(planet);
}

// Update an existing resource
const update = async (req, res) => {
  // Respond with a single resource and 2xx code
  const planet = await Planet.findByPk(req.params.id);
  if (!galaxy) return res.status(404).json({error: 'Planet not found'});
  await planet.update(req.body);
  res.status(200).json(planet);
}

// Remove a single resource
const remove = async (req, res) => {
  // Respond with a 2xx status code and bool
  const planet = await Planet.findByPk(req.params.id);
  if (!planet) return res.status(404).json({error: 'Planet not found'});
  await planet.destroy();
  res.status(204).send();
}

// Export all controller actions
module.exports = { index, show, create, update, remove }

