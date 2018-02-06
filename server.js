var express = require('express')
var bodyParser = require('body-parser')

var app = express()
var port = process.env.PORT || 3000

app.use(express.static('app/public'))

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var exphbs = require('express-handlebars')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

var routes = require('./controllers/burgers_controller.js')

app.use(routes)

app.listen(port, function () {
  console.log('App now listening at localhost : ' + port)
})
