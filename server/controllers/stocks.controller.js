var config = require('config.json');
var express = require('express');
var router = express.Router();
var stockService = require('services/stock.service');

// routes
router.get('/', getAll);
router.put('/:_id', update);
router.delete('/:_id', _delete);

module.exports = router;


function getAll(req, res) {
    stockService.getAll()
        .then(function (stocks) {
            res.send(stocks);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}


function update(req, res) {
    stockService.update(req.params._id, req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function _delete(req, res) {
    stockService.delete(req.params._id)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}