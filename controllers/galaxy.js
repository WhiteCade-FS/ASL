const { Galaxy } = require('../src/models');
const path = require('path');
const fs = require('fs');

// Show all resources
const index = async (req, res) => {
  // Respond with an array and 2xx status code
  const galaxies = await Galaxy.findAll();
    if (req.headers.accept && req.headers.accept.includes('application/json')) {
    res.json(galaxies);
  } else {
    res.render('galaxies/index.twig', {galaxies});
  }
}

// Show resource
const show = async (req, res) => {
  // Respond with a single object and 2xx code
  const galaxy = await Galaxy.findByPk(req.params.id);
  
  if (req.headers.accept && req.headers.accept.includes('application/json')) {
    return res.json(galaxy);
  } else {
    res.render('galaxies/show.twig', { galaxy })
  }
}

// Create a new resource
const create = async (req, res) => {
  const galaxy = await Galaxy.create({
    name: req.body.name,
    size: req.body.size,
    description: req.body.description
  });

  // If a file was uploaded, generate filename and move it
  if (req.files?.image) {
    const extension = path.extname(req.files.image.name);
    imageFilename = `${galaxy.id}${extension}`;
    const uploadPath = path.join(__dirname, '..', 'public', 'uploads', imageFilename);

    await req.files.image.mv(uploadPath);
    await galaxy.update({ image: imageFilename });
  }

  // Now create the galaxy with the imageFilename (or null if none)
  
  res.redirect(`/galaxies/${galaxy.id}`);
};
  const newGalaxy = (req,res) => {
  res.render('galaxies/create.twig');
}

// Update an existing resource
const update = async (req, res) => {
  // Respond with a single resource and 2xx code
  const galaxy = await Galaxy.findByPk(req.params.id);
  if (!galaxy) return res.status(404).json({error: 'Galaxy not found'});
 
  if (req.files?.image) {
  const extension = path.extname(req.files.image.name)
  const imageFilename = `${galaxy.id}${extension}`
  const uploadPath = path.join(__dirname, '..', 'public', 'uploads', imageFilename)

  await req.files.image.mv(uploadPath)

  await galaxy.update({ image: imageFilename })
}


  console.log('UPDATE FORM DATA:', req.body);
  await galaxy.update(req.body);
  res.redirect(`/galaxies/${galaxy.id}`);
}

const editGalaxy = async (req, res) => {
  const galaxy = await Galaxy.findByPk(req.params.id);
  res.render('galaxies/edit.twig', {galaxy});
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
module.exports = { index, show, create, update, remove, newGalaxy, editGalaxy }
