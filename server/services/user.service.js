var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('users');

var service = {};
var currentmoney;

service.authenticate = authenticate;
service.getAll = getAll;
service.getAllStock = getAllStock;
service.getAllUserStock = getAllUserStock;
service.buyStocks = buyStocks;
service.getById = getById;
service.create = create;
service.update = update;
service.delete = _delete;
module.exports = service;

function authenticate(username, password) {
    var deferred = Q.defer();

    db.users.findOne({ username: username }, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (user && bcrypt.compareSync(password, user.hash)) {
            // authentication successful
            deferred.resolve({
                _id: user._id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                token: jwt.sign({ sub: user._id }, config.secret)
            });
        } else {
            // authentication failed
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function getAll() {
    var deferred = Q.defer();

    db.users.find().toArray(function (err, users) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        // return users (without hashed passwords)
        users = _.map(users, function (user) {
            return _.omit(user, 'hash');
        });

        deferred.resolve(users);
    });

    return deferred.promise;
}



function getById(_id) {
    var deferred = Q.defer();

    db.users.findById(_id, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (user) {
            // return user (without hashed password)
            deferred.resolve(_.omit(user, 'hash'));
        } else {
            // user not found
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function create(userParam) {
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
}

function update(_id, userParam) {
    var deferred = Q.defer();

    // validation
    db.users.findById(_id, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (user.username !== userParam.username) {
            // username has changed so check if the new username is already taken
            db.users.findOne(
                { username: userParam.username },
                function (err, user) {
                    if (err) deferred.reject(err.name + ': ' + err.message);

                    if (user) {
                        // username already exists
                        deferred.reject('Username "' + req.body.username + '" is already taken')
                    } else {
                        updateUser();
                    }
                });
        } else {
            updateUser();
        }
    });

    function updateUser() {
        // fields to update
        var set = {
            firstName: userParam.firstName,
            lastName: userParam.lastName,
            username: userParam.username,
        };

        // update password if it was entered
        if (userParam.password) {
            set.hash = bcrypt.hashSync(userParam.password, 10);
        }

        db.users.update(
            { _id: mongo.helper.toObjectID(_id) },
            { $set: set },
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}

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

function buyStocks(us) {
  db.bind('userstocks');
  //db.userstocks.findOne({username: 'aa', stockname: 'Samsung'},{'amount'});
  var _amount;
  db.userstocks.findOne({ 'username': us.username, 'stockname': us.stockname }, function (err, stock) {
    if (err) return handleError(err);
    console.log(stock.amount);
    db.userstocks.findOneAndUpdate({username: us.username, stockname: us.stockname},
                                  {username: us.username, stockname: us.stockname, amount:stock.amount + 1});
  });
}

/*
Demo function, it doubles the aa user's money in every 5 seconds.
*/

setInterval(function() {
  console.log("Updating stocks...");
  db.bind('users');

  db.users.findOne({username: 'aa'}, function(err, result) {
    if (!err) {
      console.log('result money ' + result.money);
      currentmoney = result.money;

      db.users.update({username:'aa'}, {$set:{money:currentmoney*1.00001}}, function(err, result) {
          if (!err) console.log('Money updated!!');
      });

      console.log('currentmoney ' + currentmoney);

    }
  });


/*
  console.log("Updating stocks...");
  db.bind('stocks');

  db.stocks.find().toArray(function (err, stocks) {
      if (!err) {

        // return users (without hashed passwords)
        stocks = _.map(stocks, function (stock) {
            return _.omit(stock, '_id');
        });
        //console.log(stocks);
      }
  });
  */

  getAllStock();
  getAllUserStock();


}, 5000);


function getAllStock() {
    db.bind('stocks');
    var deferred = Q.defer();

    db.stocks.find().toArray(function (err, stocks) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        // return users (without hashed passwords)
        stocks = _.map(stocks, function (stock) {
            return stock;
        });
          //console.log(stocks);
        deferred.resolve(stocks);
    });

    return deferred.promise;
}

function getAllUserStock() {
    db.bind('userstocks');
    var deferred = Q.defer();

    db.userstocks.find().toArray(function (err, userstocks) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        // return users (without hashed passwords)
        userstocks = _.map(userstocks, function (userstock) {
            return userstock;
        });
          console.log(userstocks);
        deferred.resolve(userstocks);
    });

    return deferred.promise;
}
