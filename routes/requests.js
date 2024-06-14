'use strict';

const _       = require('lodash');
const db      = require('../db.js');
const express = require('express');
const router  = express.Router();


router.put('/:request_id/:verb/by/:attr', function(req, res, next) {    
    const tstamp = new Date();
    const by = _.pick(req.body, req.params.attr);
    
    const data = {
        accept: { accepted_by: by, accepted_at: tstamp },
        reject: { rejected_by: by, rejected_at: tstamp },
        revoke: { revoked_by:  by, revoked_at:  tstamp },
    }[req.params.verb];

    if ( data === undefined ) {
        res.status(400).jsonp(err);
        return next();
    }

    db('auth.requests')
        .update(data, { patch: true })
        .where( _.pick(req.params, ['request_id']))
        .returning('*')
        .then ( out => res.status(200).jsonp(out[0]) )
        .catch( err => res.status(404).jsonp(err) );
});

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
<<<<<<< HEAD
router.delete('/:request_id', function(req, res, next) {
=======
router.delete('/:request_id/cancel', function(req, res, next) {
    const request_id = _.pick(req.params, 'request_id');
>>>>>>> f9d84e7e6792ad40720213c39759f626ccc98730
    db('auth.requests')
        .del()
        .where(request_id)
        .returning('*')
        .then ( out => res.status(200).jsonp(out) )
        .catch( err => res.status(404).jsonp(err) );
});

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

module.exports = router;