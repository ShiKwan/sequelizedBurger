var express = require('express')

var router = express.Router()

var burger = require('../app/models/burger.js')

router.get('/', function (req, res) {
  burger.findAll({}).then(function (results) {
    console.log('getting results')
    var hbsObject = {
      burgers: results
    }
    //console.log(hbsObject)
    console.log(hbsObject.burgers);
    console.log("burgers:");
    console.log(hbsObject.burgers.dataValues)
    res.render('index', hbsObject)
  })
})

router.post('/api/burgers', function (req, res) {
  console.log(req.body.name)
  console.log(req.body.devoured)
  var dev = null
  if (req.body.devoured === true) {dev = 1}else {dev = 0}
  burger.create({
    burger: req.body.name,
    devoured: dev
  }).then(function (result) {
    res.json({id: result.insertId})
  })
})

router.put('/api/burgers/:id', function (req, res) {
  var condition = 'id = ' + req.params.id

  console.log('condition', condition)

  burger.update({
    devoured: true
  }, {
    where: {
      id: req.params.id
    }
  }).then(function (results) {
    if (results.changedRows === 0) {
      return res.status(404).end()
    }
    res.status(200).end()
  })
})

module.exports = router
