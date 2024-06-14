'use strict';

const _       = require('lodash');
const db      = require('../db.js');
const express = require('express');
const router  = express.Router();

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
router.get('/', function(req, res, next){
    console.log(req.query)
    db('cais.rules')
        .select()
        .where(req.query)
        .orderBy(['fence_id', 'rule_order'])
        .then ( out => res.status(200).jsonp(out) )
        .catch( err => res.status(404).jsonp(err) );
});

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

router.post('/', function(req, res, next){
    db('cais.rules')
        .insert(req.body)
        .returning('*')
        .then ( out => res.status(200).jsonp(out) )
        .catch( err => res.status(404).jsonp(err) );
});

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
router.get('/:rule_id', function(req, res, next){
    db('cais.rules')
        .first()
        .where(req.params)
        .then ( out => res.status(200).jsonp(out) )
        .catch( err => res.status(404).jsonp(err) );
});

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
router.delete('/:rule_id', function(req, res, next){
    db('cais.rules')
        .del()
        .where(req.params)
        .returning('*')
        .then ( out => res.status(200).jsonp(out) )
        .catch( err => res.status(404).jsonp(err) );
});

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
router.patch('/:rule_id', function(req, res, next){
    db('cais.rules')
        .update(req.body, { patch: true })
        .where(req.params)
        .returning('*')
        .then ( out => res.status(200).jsonp(out) )
        .catch( err => res.status(404).jsonp(err) );
});

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

module.exports = router;