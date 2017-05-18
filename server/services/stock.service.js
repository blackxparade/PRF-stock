var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('stocks');

var service = {};
var currentprice;


service.getById = getById;

service.update = update;


module.exports = service;

function getAll() {
    var deferred = Q.defer();

    db.stocks.find().toArray(function (err, stocks) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        // return users (without hashed passwords)
        stocks = _.map(stocks, function (stock) {
            return _.omit(stock, '_id');
        });

        deferred.resolve(stocks);
    });

    return deferred.promise;
}

function getById(_id) {
    var deferred = Q.defer();

    db.stocks.findById(_id, function (err, stock) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (stock) {
            // return user (without hashed password)
            deferred.resolve(_.omit(stock, 'hash'));
        } else {
            // user not found
            deferred.resolve();
        }
    });

    return deferred.promise;
}



function update(_id, stockaram) {
    var deferred = Q.defer();

    // validation
    db.stocks.findById(_id, function (err, stock) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (stock.stockname !== stockParam.stockname) {
            // username has changed so check if the new username is already taken
            db.stocks.findOne(
                { stockname: stockParam.stockname },
                function (err, stock) {
                    if (err) deferred.reject(err.name + ': ' + err.message);

                    if (stock) {
                        // username already exists
                        deferred.reject('Stockname "' + req.body.stockname + '" is already taken')
                    } else {
                        updateStock();
                    }
                });
        } else {
            updateStock();
        }
    });

    function updateStock() {
        // fields to update
        var set = {

            stockname: stockParam.stockname,
            price: stockParam.price,
        };

        // update password if it was entered
        if (stockParam.password) {
            set.hash = bcrypt.hashSync(stockParam.password, 10);
        }

        db.stocks.update(
            { _id: mongo.helper.toObjectID(_id) },
            { $set: set },
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}




/*
Demo function, it doubles the aa user's money in every 5 seconds.
*/

setInterval(function() {
  db.bind('stocks');

  db.stocks.findOne({stockname: 'ss'}, function(err, result) {
    if (!err) {
    var d = new Date();
    var n = d.getTime()/200;


      db.stocks.update({stockname:'ss'}, {$set:{price:100+100*Math.sin(0.003*n)*Math.cos(0.004*n+4*Math.sin(0.002*n))}}, function(err, result) {
        if (!err) console.log('Price updated!!');
      });

          console.log(result.price);



    }
  });
  db.stocks.findOne({stockname: 'Branack'}, function(err, result) {
    if (!err) {
    var d = new Date();
    var n = d.getTime()/200;


      db.stocks.update({stockname:'Branack'}, {$set:{price:60+50*Math.sin(0.0003*n)*Math.cos(0.005*n+6*Math.sin(0.007*n+3))}}, function(err, result) {
        if (!err) console.log('Price updated!!');
      });

          



    }
  });

    db.stocks.findOne({stockname: 'Apple'}, function(err, result) {
    if (!err) {
    var d = new Date();
    var n = d.getTime()/200;


      db.stocks.update({stockname:'Apple'}, {$set:{price:2000+400*Math.sin(0.000003*n)*Math.cos(0.000005*n+6*Math.sin(0.0000007*n+3))}}, function(err, result) {
        if (!err) console.log('Price updated!!');
      });

          



    }
  });

      db.stocks.findOne({stockname: 'Samsung'}, function(err, result) {
    if (!err) {
    var d = new Date();
    var n = d.getTime()/200;


      db.stocks.update({stockname:'Samsung'}, {$set:{price:1000+700*Math.cos(0.0003*n)*Math.cos(0.005*n+6*Math.cos(0.0007*n+10))*Math.sin(0.00005*n)}}, function(err, result) {
        if (!err) console.log('Price updated!!');
      });

          



    }
  });

       db.stocks.findOne({stockname: 'Riot'}, function(err, result) {
    if (!err) {
    var d = new Date();
    var n = d.getTime()/200;


      db.stocks.update({stockname:'Riot'}, {$set:{price:600+300*Math.sin(0.0012*n)*Math.cos(0.0006*n+9*Math.cos(0.007*n+11))*Math.cos(0.00005*n)}}, function(err, result) {
        if (!err) console.log('Price updated!!');
      });

          



    }
  });

        db.stocks.findOne({stockname: 'HP'}, function(err, result) {
    if (!err) {
    var d = new Date();
    var n = d.getTime()/200;


      db.stocks.update({stockname:'HP'}, {$set:{price:700+700*Math.cos(0.000003*n)*Math.sin(0.00005*n+13*Math.cos(0.009*n+10))*Math.cos(0.000455*n)}}, function(err, result) {
        if (!err) console.log('Price updated!!');
      });

          



    }
  });

         db.stocks.findOne({stockname: 'Lenovo'}, function(err, result) {
    if (!err) {
    var d = new Date();
    var n = d.getTime()/200;


      db.stocks.update({stockname:'Lenovo'}, {$set:{price:459+200*Math.sin(0.0000073*n+12)*Math.cos(0.000034*n+6)}}, function(err, result) {
        if (!err) console.log('Price updated!!');
      });

          



    }
  });

     db.stocks.findOne({stockname: 'Szentkiralyi'}, function(err, result) {
        if (!err) {
        var d = new Date();
        var n = d.getTime()/200;


          db.stocks.update({stockname:'Szentkiralyi'}, {$set:{price:100+20*Math.cos(0.0003*n)*Math.sin(0.005*n+6)*Math.sin(0.00000008*n+5)}}, function(err, result) {
            if (!err) console.log('Price updated!!');
          });

              



        }
      });

          db.stocks.findOne({stockname: 'Sony'}, function(err, result) {
        if (!err) {
        var d = new Date();
        var n = d.getTime()/200;


          db.stocks.update({stockname:'Sony'}, {$set:{price:1000+900*Math.sin(0.03*n)*Math.sin(0.000005*n+2)*Math.sin(0.000004*n+0.4)*Math.cos(n)}}, function(err, result) {
            if (!err) console.log('Price updated!!');
          });

              



        }
      });

               db.stocks.findOne({stockname: 'Microsoft'}, function(err, result) {
        if (!err) {
        var d = new Date();
        var n = d.getTime()/200;


          db.stocks.update({stockname:'Microsoft'}, {$set:{price:2000+400*Math.cos(0.0000007*n+3)*Math.cos(0.00000005*n+7)*Math.cos(0.00000067*n+4)*Math.sin(0.0000000012*n+4)}}, function(err, result) {
            if (!err) console.log('Price updated!!');
          });

              



        }
      });




}, 5000);

