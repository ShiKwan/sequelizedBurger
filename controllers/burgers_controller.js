var db = require('../app/models')

module.exports = function (app) {
  app.get('/', function (req, res) {
    db.Burger.findAll({include: [db.Customer]}).then(function (results) {
      console.log('getting results')
      console.log(JSON.stringify(results));

      console.log("--------------")
      console.log("--------------")
      console.log("--------------")
      var hbsObject = {
        burgers: results,
      }
      // console.log(hbsObject)
      //console.log(hbsObject.burgers)
      console.log('burgers:')
      console.log(hbsObject)
      res.render('index', hbsObject)
    }).catch(function(err){
        console.log(err);
    })
  })

  app.post('/api/burgers', function (req, res, next) {
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
        console.log("in catch function");
        console.log(err);
        next(err);
        //res.json(err);
    })
  })

  app.put('/api/burgers/:burger_id', function (req, res, next) {
    var condition = 'burger_id = ' + req.params.burger_id
    var customer_name = 'customer name = ' + req.body.customerName
    console.log('condition', condition)
    console.log('customer name', customer_name)

    db.Customer.findOrCreate({
      where: {customer: req.body.customerName},
      defaults: {burger_id: req.params.burger_id, lastVisited: req.body.dateVisited }
    }).then(function (customer, created) {
      var customerData = {
          customer : customer
      }
      if (customer) {
          console.log("customer : " )
          console.log(customer);
        customerData.customer = customer
      }else {
          //console.log("created : " )
          //console.log(created);
        //customerData = customer
      }


      console.log("customerData : " )
      console.log(customerData.customer[0].dataValues.id);
      //console.log(customerData.id);

      db.Burger.update(
        {
            devoured: req.body.devoured,
            CustomerId : customerData.customer[0].dataValues.id,
        }, 
        {
            where: 
            {
                id: req.params.burger_id
            },
            raw : true,
        }).then(function (results) {
            console.log('in update function')
            if (results.changedRows === 0) {
            return res.status(404).end()
            }
            res.status(200).end()
        }).catch(function(err){
            console.log("in catch function");
            console.log(err);
            next(err)
        })
    }).catch(function(err){
        console.log("find create failed");
        console.log(err);
        next(err);
    })
  })
}
