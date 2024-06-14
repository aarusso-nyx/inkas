'use strict'

const db      = require('../db');
const express = require('express');
const router  = express.Router();

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
router.get('/seascape', function(req, res, next) {    
    db('cais.seascape')
        .select()
        .where( req.query || {})
        .then ( out => res.status(200).jsonp(out) )
        .catch( err => res.status(404).jsonp(err) );
});

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
router.get('/seastream', function(req, res, next) {    
    const qs = _.defaults(req.query, { ts: 0, tf: 9223372036854775807, dt: 60 });
    db.raw('SELECT cais.seastream(?, ?, ?)', [qs.ts, qs.tf, qs.dt])
        .then ( out => res.status(200).jsonp(out) )
        .catch( err => res.status(404).jsonp(err) );
});

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
router.get('/presences', function(req, res, next) {    
    db('cais.presences')
        .select()
        .where( req.query || {})
        .then ( out => res.status(200).jsonp(out) )
        .catch( err => res.status(404).jsonp(err) );
});

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
module.exports = router;