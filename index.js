// Load in our Express framework
const express       = require(`express`)

// Create a new Express instance called "app"
const app           = express()
//const bodyParser = require('body-parser');
app.use(express.urlencoded({ extended: true }));
// Load in our RESTful routers
const fileUpload = require('express-fileupload')
app.use(fileUpload())
app.use('/uploads', express.static(__dirname + '/public/uploads'))
app.use(express.static(__dirname + '/public'))

const routers = require('./routers/index.js')

app.set("twig options", {
  allowAsync: true,
strict_variables: false
});

app.set('views', __dirname + '/src/views');
app.set('view engine', 'twig')

app.use(express.json());








// Home page welcome middleware
app.get('/', (req, res) => {
  res
    .status(200)
    .render('home')
})

// Register our RESTful routers with our "app"
app.use(`/planets`,  routers.planet)
app.use(`/stars`,    routers.star)
app.use(`/galaxies`, routers.galaxy)

// Set our app to listen on port 3000
app.listen(3000)
