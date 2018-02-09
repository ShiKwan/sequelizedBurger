var express = require('express')
var bodyParser = require('body-parser')

var app = express()
var port = process.env.PORT || 3000

var db = require("./app/models");

app.use(express.static('app/public'))

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var exphbs = require('express-handlebars')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

require("./controllers/burgers_controller.js")(app);

app.use(function(err, req, res, next) {
    console.error('We had an error.', err);
    res.status(500).json({
        message: err.message
    });
    res.render('index', err.message);
});

db.sequelize.sync({ force: false}).then(function(){
  app.listen(port, function () {
  console.log('App now listening at localhost : ' + port)
})

})
