// Load in Express framework
const express = require(`express`)

// Load in our controller/action instances
const galaxyCtlr = require(`../controllers/galaxy.js`)
const { uploadGalaxyImage } = require('../middlewares')

// Create a new Router instance and call it "router"
const router = new express.Router()

// RESTful resource mappings
router.get(`/`, galaxyCtlr.index)
router.get(`/new`, galaxyCtlr.newGalaxy)
router.get(`/:id/edit`, galaxyCtlr.editGalaxy)
router.post(`/`, galaxyCtlr.create, uploadGalaxyImage, (req,res) => {
  res.redirect(`/galaxies/${req.galaxyId}`)
})
router.post(`/:id/update`, galaxyCtlr.update, uploadGalaxyImage, (req,res) => {
  res.redirect(`/galaxies/${req.galaxyId}`)
})
router.post(`/:id/delete`, galaxyCtlr.remove)
router.get(`/:id`, galaxyCtlr.show)  
// export "router"
module.exports = router
