'use strict';

const _       = require('lodash');
const db      = require('../db.js');
const express = require('express');
const router  = express.Router();

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
router.get('/', function(req, res, next){
    db('auth.apps')
        .select()
        .where(req.query || {})
        .then ( out => res.status(200).jsonp(out) )
        .catch( err => res.status(404).jsonp(err) );
});

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
router.post('/', function(req, res, next){
    db('auth.apps')
        .insert(req.body)
        .returning('*')
        .then ( out => res.status(200).jsonp(out) )
        .catch( err => res.status(404).jsonp(err) );
});

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
router.get(`/:app_id`, function(req, res, next){
    db('auth.apps')
        .first()
        .where(req.params)
        .then ( out => { 
            db('auth.roles')
                .select()
                .where(req.params)
                .then(roles => res.status(200).jsonp({...out, roles })); 
        })
        .catch( err => res.status(404).jsonp(err) );
});

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
router.delete(`/:app_id`, function(req, res, next){
    db('auth.apps')
        .del()
        .where(req.params)
        .returning('*')
        .then ( out => res.status(200).jsonp(out) )
        .catch( err => res.status(404).jsonp(err) );
});

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
router.patch(`/:app_id`, function(req, res, next){
    db('auth.apps')
        .update(req.body, { patch: true })
        .where(req.params)
        .returning('*')
        .then ( out => res.status(200).jsonp(out) )
        .catch( err => res.status(404).jsonp(err) );
});

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
router.post('/:app_id/licenses', function(req, res, next) {
    db('auth.licenses')
        .insert({ ...req.body, ...req.params })
        .returning('*')
        .then ( out => res.status(200).jsonp(out) )
        .catch( err => res.status(404).jsonp(err) );
});

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
router.get('/:app_id/licenses', function(req, res, next) {
    db('auth.licenses_req')
        .select()
        .join ('auth.requests', 'assigns.request_id',  'requests.request_id')
        .join ('auth.orgs', 'apps.org_id', 'licenses.org_id')
        .where(req.params)
        .then ( out => res.status(200).jsonp(out) )
        .catch( err => res.status(404).jsonp(err) );
});


///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
module.exports = router;
