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
//service.create = create;
service.update = update;
//service.delete = _delete;

module.exports = service;



function getAll() {
    var deferred = Q.defer();

    db.stocks.find().toArray(function (err, stocks) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        // return users (without hashed passwords)
        stocks = _.map(stocks, function (stock) {
            return _.omit(stock, 'hash');
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

/*function create(userParam) {
    var deferred = Q.defer();

    // validation
    db.users.findOne(
        { username: userParam.username },
        function (err, user) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            if (user) {
                // username already exists
                deferred.reject('Username "' + userParam.username + '" is already taken');
            } else {
                createUser();
            }
        });

    function createUser() {
        // set user object to userParam without the cleartext password
        var user = _.omit(userParam, 'password');

        // add hashed password to user object
        user.hash = bcrypt.hashSync(userParam.password, 10);

        db.users.insert(
            user,
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}*/

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
function _delete(_id) {
    var deferred = Q.defer();

    db.users.remove(
        { _id: mongo.helper.toObjectID(_id) },
        function (err) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
        });

    return deferred.promise;
}
*/


/*
Demo function, it doubles the aa user's money in every 5 seconds.
*/

setInterval(function() {
  console.log("Updating stocks...");

  db.stocks.findOne({stockname: 'ss'}, function(err, result) {
    if (!err) {
      console.log('result money ' + result.price);
      currentprice = result.price;

      db.stocks.update({stockname:'ss'}, {$set:{price:currentprice*2}}, function(err, result) {
          if (!err) console.log('Price updated!!');
      });

      console.log('currentprice ' + currentprice);

    }
  });
}, 5000);

