var db = require('../app/models')

module.exports = function (app) {
  app.get('/', function (req, res) {
    db.Burger.findAll({include: [db.Customer]}).then(function (results) {
      console.log('getting results')
      var hbsObject = {
        burgers: results
      }
      // console.log(hbsObject)
      //console.log(hbsObject.burgers)
      console.log('burgers:')
      console.log(hbsObject.burgers.dataValues)
      console.log(hbsObject.burgers.Customer)
      res.render('index', hbsObject)
    }).catch(function(err){
        console.log(err);
    })
  })

  app.post('/api/burgers', function (req, res) {
    console.log(req.body.name)
    console.log(req.body.devoured)
    var dev = null
    if (req.body.devoured === true) {dev = 1}else {dev = 0}
    db.Burger.create({
      burger: req.body.name,
      CustomerId : null,
      devoured: dev
    }).then(function (result) {
      res.json({id: result.insertId})
    }).catch(function(err){
        console.log(err);
        res.json(err);
    })
  })

  app.put('/api/burgers/:burger_id', function (req, res) {
    var condition = 'burger_id = ' + req.params.burger_id
    var customer_name = 'customer name = ' + req.body.customerName
    console.log('condition', condition)
    console.log('customer name', customer_name)

    db.Customer.findOrCreate({
      where: {customer: req.body.customerName},
      defaults: {burger_id: req.params.burger_id, lastVisited: req.body.dateVisited }
    }).spread(function (customer, created) {
      var customerData = []
      if (customer) {
        console.log('found customer')
        console.log(customer)
        customerData = customer
      }else {
        console.log('created a new customer')
        console.log(created)
        customerData = created
      }

      db.Burger.update({
        devoured: req.body.devoured,
        CustomerId : customer.id
      }, {
        where: {
          id: req.params.burger_id
        }
      }).then(function (results) {
        console.log('in update function')
        if (results.changedRows === 0) {
          return res.status(404).end()
        }
        res.status(200).end()
      })
    })
  })
}
