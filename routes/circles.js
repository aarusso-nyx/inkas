'use strict';

const _       = require('lodash');
const db      = require('../db.js');
const express = require('express');
const router  = express.Router();

// 

/*
// Circle 
* lista das mensagens de um circulo ? ts=xxx & tf=[now]
* lista dos usuários de um circle

// Enrolls
send invite to another assignee from same org, same entity
revoke_or_delete
accept/reject invite
*/


///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
router.get('/:circle_id/messages', function(req, res, next){
  const { ts = 0, tf = Date.now(), limit = 1000, offset = 0 } = req.query;
  let [tsISO, tfISO] = [ts, tf].map(k => new Date(parseInt(k)));
  db('msg.messages')
      .select()
      .where(req.params)
      .andWhereBetween('tstamp', [tsISO, tfISO])
      .limit(limit)
      .offset(offset)
      .then ( out => res.status(200).jsonp(out) )
      .catch( err => res.status(404).jsonp(err) );
});


///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
router.post('/:circle_id/enroll', function(req, res, next){
  db('auth.enrolls')
      .insert({...req.body, ...req.params})
      .returning('*')
      // .then(sendInvite)
      .then ( out => res.status(200).jsonp(out[0]) )
      .catch( err => res.status(404).jsonp(err) );
});


///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
router.post('/:circle_id/close', function(req, res, next){
  db('auth.circles')
      .update({ closed_at: new Date() })
      .where(req.params)
      .returning('*')
      .then ( out => res.status(200).jsonp(out[0]) )
      .catch( err => res.status(404).jsonp(err) );
});



module.exports = router;