const { Star, Planet } = require('../src/models');
const path = require('path');

// Show all resources
const index = async (req, res) => {
  const stars = await Star.findAll();
  if (req.headers.accept?.includes('application/json')) {
    return res.json(stars);
  }
  res.render('stars/index.twig', { stars });
};
// Show resource
const show = async (req, res) => {
  const star = await Star.findByPk(req.params.id);
  if (req.headers.accept?.includes('application/json')) {
    return res.json(star);
  }
  res.render('stars/show.twig', { star });
};

const newStar = (req, res) => {
  res.render('stars/create.twig');
};


// Create a new resource
const create = async (req, res) => {
  let imageName = null;

  const star = await Star.create({
    name: req.body.name,
    size: req.body.size,
    description: req.body.description
  });

  if (req.files?.image) {
    const extension = path.extname(req.files.image.name);
    imageName = `${star.id}${extension}`;
    const uploadPath = path.join(__dirname, '..', 'public', 'uploads', 'stars', imageName);
    await req.files.image.mv(uploadPath);
    await star.update({ image: imageName });
  }

  res.redirect(`/stars/${star.id}`);
};

const editStar = async (req, res) => {
  const star = await Star.findByPk(req.params.id);
  res.render('stars/edit.twig', { star });
};


// Update an existing resource
const update = async (req, res) => {
  const star = await Star.findByPk(req.params.id);
  if (!star) return res.status(404).json({ error: 'Star not found' });

  await star.update({
    name: req.body.name,
    size: req.body.size,
    description: req.body.description
  });

  if (req.files?.image) {
    const extension = path.extname(req.files.image.name);
    const imageName = `${star.id}${extension}`;
    const uploadPath = path.join(__dirname, '..', 'public', 'uploads', 'stars', imageName);
    await req.files.image.mv(uploadPath);
    await star.update({ image: imageName });
  }

  res.redirect(`/stars/${star.id}`);
};
// Remove a single resource
const remove = async (req, res) => {
  const star = await Star.findByPk(req.params.id);
  if (!star) return res.status(404).json({ error: 'Star not found' });
  await star.destroy();
  res.redirect('/stars');
};
// Export all controller actions
module.exports = { index, show, create, update, remove, newStar, editStar };
