'use strict';

const _       = require('lodash');
const db      = require('../db.js');
const express = require('express');
const router  = express.Router();

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
router.get('/', function(req, res, next){
    db('smart.tasks')
        .select()
        .where(req.params)
        .then ( out => res.status(200).jsonp(out) )
        .catch( err => res.status(404).jsonp(err) );
});

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

router.get('/:task_id', function(req, res, next){
    db('smart.tasks')
        .select()
        .where(req.params)
        .then ( out => res.status(200).jsonp(out) )
        .catch( err => res.status(404).jsonp(err) );
});


router.post('/', function(req, res, next){
    db('smart.tasks')
        .insert(req.body)
        .then ( out => res.status(200).jsonp(out) )
        .catch( err => res.status(404).jsonp(err) );
});

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
router.delete('/:task_id', function(req, res, next){
    db('smart.tasks')
        .del()
        .where(req.params)
        .then ( out => res.status(200).jsonp(out) )
        .catch( err => res.status(404).jsonp(err) );
});

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
router.patch('/:task_id', function(req, res, next){
    db('smart.tasks')
        .update(req.body, { patch: true })
        .where(req.params)
        .returning('*')
        .then ( out => res.status(200).jsonp(out) )
        .catch( err => res.status(404).jsonp(err) );
});

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

router.get('/:task_id/stakeholders', function(req, res, next){
    db('smart.stakeholders')
        .select()
        .join('auth.entities', 'stakeholders.entity_id', 'entities.entity_id')
        .where(req.params)
        .then ( out => res.status(200).jsonp(out) )
        .catch( err => res.status(404).jsonp(err) );
});

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

router.post('/:task_id/stakeholders', function(req, res, next){
    db('smart.stakeholders')
        .insert(req.body)
        .returning('*')
        .then ( out => res.status(200).jsonp(out) )
        .catch( err => res.status(404).jsonp(err) );
});

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

router.delete('/:task_id/stakeholders/:stakeholder_id', function(req, res, next){
    db('smart.stakeholders')
        .del()
        .where(req.params)
        .then ( out => res.status(200).jsonp(out) )
        .catch( err => res.status(404).jsonp(err) );
});

module.exports = router;