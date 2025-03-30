const util = require('util');
const path = require('path');
const { Galaxy } = require('../src/models');

const uploadGalaxyImage = async (req, res, next) => {
  if (!req.galaxyId) return;

  const uploadDir = path.join(__dirname, '../public/uploads');
  const image = req.files?.image;
  if (!image) return;

  const extension = path.extname(image.name);
  const finalPath = util.format('%s/%s%s', uploadDir, req.galaxyId, extension);

  await image.mv(finalPath);

  // Store just the filename (or galaxyId.ext)
  await Galaxy.update(
    { image: `${req.galaxyId}${extension}` },
    { where: { id: Number(req.galaxyId) } }
  );

  next();
};

module.exports = { uploadGalaxyImage };

