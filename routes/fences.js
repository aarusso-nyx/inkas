'use strict'

const db      = require('../db.js');
const express = require('express');
const router  = express.Router();

const cols =  [ 'fence_id',     
                'fence_name', 
                'style',
                'geometry_type', 
                'geom_geojson'];

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
router.get('/', function(req, res, next) {
    db('cais.fences')
        .select(cols)
        .where(req.query || {})
        // .andWhere({ deleted: false })
        // .orderBy(['port_id', 'geometry_type','fence_name'])
        .then ( out => res.status(200).jsonp(out) )
        .catch( err => res.status(404).jsonp(err) );
});

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
router.get('/:fence_id', function(req, res, next) {
    db('cais.fences')
        .first(cols)
        .where(req.params)
        .then ( out => res.status(200).jsonp(out.geom_geojson) )
        .catch( err => res.status(404).jsonp(err) );
});

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
router.post('/', function(req, res, next) {
    db('cais.fences')
        .insert(req.body)
        .returning(cols)
        .then ( out => res.status(200).jsonp(out[0]) )
        .catch( err => res.status(404).jsonp(err) );
});

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
// Update fence
router.patch('/:fence_id', function(req, res, next) {
    db('cais.fences')
        .update(req.body, { patch: true })
        .returning(cols)
        .where(req.params)
        .then ( out => res.status(200).jsonp(out[0]) )
        .catch( err => res.status(404).jsonp(err) );
});

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
// Mark fence as 'un-deleted'
router.put('/:fence_id', function(req, res, next) {
    db('cais.fences')
        .update({ deleted: false }, { patch: true })
        .returning(cols)
        .where(req.params)
        .then ( out => res.status(200).jsonp(out[0]) )
        .catch( err => res.status(404).jsonp(err) );
});

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
// Mark fence as 'deleted'
router.delete('/:fence_id', function(req, res, next) {
    db('cais.fences')
        .update({ deleted: true }, { patch: true })
        .returning(cols)
        .where(req.params)
        .then ( out => res.status(200).jsonp(out[0]) )
        .catch( err => res.status(404).jsonp(err) );
});

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
module.exports = router;