const { Star, Planet } = require('../src/models');

// Show all resources
const index = async (req, res) => {
  // Respond with an array and 2xx status code
  const stars = await Star.findAll({
    include: ['Planets']
  });
    res.status(200).json(stars);
}

// Show resource
const show = async (req, res) => {
  // Respond with a single object and 2xx code
  const star = await Star.findByPk(req.params.id);
  res.status(200).json(star);
}

// Create a new resource
const create = async (req, res) => {
  // Issue a redirect with a success 2xx code
  const star = await Star.create(req.body);

  const { planetId } = req.body;

  if (planetId) {
    const planet = await Planet.findByPk(planetId);
    if (planet) {
      await star.addPlanet(planet);
    }
  }


  const starPlanet = await Star.findByPk(star.id, { include: ['Planets']})
  res.status(201).json(starPlanet);
}

// Update an existing resource
const update = async (req, res) => {
  // Respond with a single resource and 2xx code
  const star = await Star.findByPk(req.params.id);
  if (!star) return res.status(404).json({error: 'Star not found'});
  await star.update(req.body);
  res.status(200).json(star);
}

// Remove a single resource
const remove = async (req, res) => {
  // Respond with a 2xx status code and bool
  const star = await Star.findByPk(req.params.id);
  if (!star) return res.status(404).json({error: 'Star not found'});
  await star.destroy();
  res.status(204).send();
}

// Export all controller actions
module.exports = { index, show, create, update, remove }


