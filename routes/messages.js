'use strict'

const db = require('../db.js');
const _ = require('lodash');
const express = require('express');
const router = express.Router();

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
router.post('/', function (req, res, next) {
    new db('msg.messages')
        .insert(req.body)
        .returning(['message_id', 'circle_id'])
        // .then( advertise('circle_id') )
        .then(data => res.status(200).jsonp(data))
        .catch(err => res.status(404).jsonp(err));
});

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
router.delete('/:messages_id', function (req, res, next) {
    new db('msg.messages')
        .update({ hidden: true })
        .returning(['messages_id', 'hidden'])
        .where(req.params)
        .then(data => res.status(200).jsonp(data))
        .catch(err => res.status(404).jsonp(err));
    });
    



////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
router.put('/:messages_id', function (req, res, next) {
    new db('msg.messages')
        .update({ hidden: true })
        .returning(['messages_id', 'hidden'])
        .where(req.params)
        .then(data => res.status(200).jsonp(data))
        .catch(err => res.status(404).jsonp(err));
});


////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
router.put('/:messages_id/ack', function (req, res, next) {
    new db('sma.msgacks')
        .update({ tstamp: new Date() }, { patch: true })
        .where({ ...req.params, ...req.body })
        .then(data => res.status(200).jsonp(data))
        .catch(err => res.status(404).jsonp(err));
});

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
router.patch('/:messages_id/ack', function (req, res, next) {
    new db('sma.msgacks')
        .update({ ack_at: new Date() }, { patch: true })
        .where({ ...req.params, ...req.body })
        .then(data => res.status(200).jsonp(data))
        .catch(err => res.status(404).jsonp(err));
});

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
module.exports = router;