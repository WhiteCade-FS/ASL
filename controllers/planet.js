const { Planet } = require('../src/models');
const path = require('path');

const index = async (req, res) => {
  const planets = await Planet.findAll();
  if (req.headers.accept?.includes('application/json')) {
    return res.json(planets);
  }
  res.render('planets/index.twig', { planets });
};

const show = async (req, res) => {
  const planet = await Planet.findByPk(req.params.id);
  if (req.headers.accept?.includes('application/json')) {
    return res.json(planet);
  }
  res.render('planets/show.twig', { planet });
};

const newPlanet = (req, res) => {
  res.render('planets/create.twig');
};

const create = async (req, res) => {
  let imageName = null;

  const planet = await Planet.create({
    name: req.body.name,
    size: req.body.size,
    description: req.body.description
  });

  if (req.files?.image) {
    const extension = path.extname(req.files.image.name);
    imageName = `${planet.id}${extension}`;
    const uploadPath = path.join(__dirname, '..', 'public', 'uploads', 'planets', imageName);
    await req.files.image.mv(uploadPath);
    await planet.update({ image: imageName });
  }

  res.redirect(`/planets/${planet.id}`);
};

const editPlanet = async (req, res) => {
  const planet = await Planet.findByPk(req.params.id);
  res.render('planets/edit.twig', { planet });
};

const update = async (req, res) => {
  const planet = await Planet.findByPk(req.params.id);
  if (!planet) return res.status(404).json({ error: 'Planet not found' });

  await planet.update({
    name: req.body.name,
    size: req.body.size,
    description: req.body.description
  });

  if (req.files?.image) {
    const extension = path.extname(req.files.image.name);
    const imageName = `${planet.id}${extension}`;
    const uploadPath = path.join(__dirname, '..', 'public', 'uploads', 'planets', imageName);
    await req.files.image.mv(uploadPath);
    await planet.update({ image: imageName });
  }

  res.redirect(`/planets/${planet.id}`);
};

const remove = async (req, res) => {
  const planet = await Planet.findByPk(req.params.id);
  if (!planet) return res.status(404).json({ error: 'Planet not found' });
  await planet.destroy();
  res.redirect('/planets');
};

module.exports = { index, show, create, update, remove, newPlanet, editPlanet };
