'use strict';

const _ = require('lodash');
const db = require('../db.js');
const express = require('express');
const router = express.Router();

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
router.get('/', function (req, res, next) {
    db('smart.ports')
        .select()
        .where(req.query || {})
        .then(out => res.status(200).jsonp(out))
        .catch(err => res.status(404).jsonp(err));
});

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
router.post('/', function (req, res, next) {
    db('smart.ports')
        .insert(req.body)
        .returning('*')
        .then(out => res.status(200).jsonp(out))
        .catch(err => res.status(404).jsonp(err));
});

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
router.get('/:port_id', function (req, res, next) {
    db('smart.ports')
        .first()
        .where(req.params)
        .then(out => {
            db('smart.facilities')
                .select()
                .where(req.params)
                .then(facilities => res.status(200).jsonp({ ...out, facilities }));

        })
        .catch(err => res.status(404).jsonp(err));
});

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
router.delete('/:port_id', function (req, res, next) {
    db('smart.ports')
        .del()
        .where(req.params)
        .returning('*')
        .then(out => res.status(200).jsonp(out))
        .catch(err => res.status(404).jsonp(err));
});

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
router.patch('/:port_id', function (req, res, next) {
    db('smart.ports')
        .update(req.body, { patch: true })
        .where(req.params)
        .returning('*')
        .then(out => res.status(200).jsonp(out))
        .catch(err => res.status(404).jsonp(err));
});

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
router.get('/:port_id/facilities', function (req, res, next) {
    db('smart.facilities')
        .select()
        .where(req.params)
        .then(out => res.status(200).jsonp(out))
        .catch(err => res.status(404).jsonp(err));
});

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
router.post('/:port_id/facilities', function (req, res, next) {
    db('smart.facilities')
        .insert(req.body)
        .returning('*')
        .then(out => res.status(200).jsonp(out))
        .catch(err => res.status(404).jsonp(err));
});

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
router.get('/:port_id/facilities/:facility_id', function (req, res, next) {
    db('smart.facilities')
        .first()
        .where(req.params)
        .then(out => {
            db('smart.berths')
                .select()
                .where(_.omit(req.params, 'port_id'))
                .then(berths => res.status(200).jsonp({ ...out, berths }));
        })
        .catch(err => res.status(404).jsonp(err));
});

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
router.delete('/:port_id/facilities/:facility_id', function (req, res, next) {
    db('smart.facilities')
        .del()
        .where(req.params)
        .returning('*')
        .then(out => res.status(200).jsonp(out))
        .catch(err => res.status(404).jsonp(err));
});

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
router.patch('/:port_id/facilities/:facility_id', function (req, res, next) {
    db('smart.facilities')
        .update(req.body, { patch: true })
        .where(req.params)
        .returning('*')
        .then(out => res.status(200).jsonp(out))
        .catch(err => res.status(404).jsonp(err));
});

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
router.get('/:port_id/facilities/:facility_id/berths', function (req, res, next) {
    db('smart.berths')
        .select()
        .where(_.omit(req.params, 'port_id'))
        .then(out => res.status(200).jsonp(out))
        .catch(err => res.status(404).jsonp(err));
});

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
router.post('/:port_id/facilities/:facility_id/berths', function (req, res, next) {
    db('smart.berths')
        .insert(req.body)
        .returning('*')
        .then(out => res.status(200).jsonp(out))
        .catch(err => res.status(404).jsonp(err));
});

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
router.get('/:port_id/facilities/:facility_id/berths/:berth_id', function (req, res, next) {
    const params = _.pick(req.params, ['berth_id']);
    db('smart.berths')
        .first()
        .where(params)
        .then(out => {
            db('smart.tasks')
                .select()
                .where(params)
                .then(tasks => res.status(200).jsonp({ ...out, tasks }));
        })
        .catch(err => res.status(404).jsonp(err));
});

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
router.delete('/:port_id/facilities/:facility_id/berths/:berth_id', function (req, res, next) {
    db('smart.berths')
        .del()
        .where(_.pick(req.params, ['berth_id']))
        .returning('*')
        .then(out => res.status(200).jsonp(out))
        .catch(err => res.status(404).jsonp(err));
});

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
router.patch('/:port_id/facilities/:facility_id/berths/:berth_id', function (req, res, next) {
    db('smart.berths')
        .update(_.pick(req.body, ['berth_id', 'berth_name','facility_id']), { patch: true })
        .where(_.pick(req.params, ['berth_id']))
        .returning('*')
        .then(out => res.status(200).jsonp(out))
        .catch(err => res.status(404).jsonp(err));
});

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

module.exports = router;