'use strict';

const _ = require('lodash');
const db = require('../db.js');
const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth.js');
const advertise = require('../ws/advertise.js');

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
router.get('/', function (req, res, next) {
    const { limit = 1000, offset = 0 } = req.query;
    db('smart.dockings_stages')
        .select()
        // .where(req.query || {})
        .limit(limit > 1000 ? 1000 : limit)
        .offset(offset)
        .then(out => res.status(200).jsonp(out))
        .catch(err => res.status(404).jsonp(err));
});

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
router.get('/:docking_id', function (req, res, next) {
    db('smart.dockings_stages')
        .select()
        .where(req.params)
        .first()
        .then(out => res.status(200).jsonp(out))
        .catch(err => res.status(404).jsonp(err));
});


///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
const sendInvite = (enroll) => {
    console.log(enroll)
    // send invitation to user_id 
    // notiify via websockets for all clientes "registered" with user_id == enroll.user_id
};


router.post('/', auth, function (req, res, next) {
    db('smart.dockings')
        .insert(_.omit(req.body, ['docking_id', 'stage_id']))
        .returning('*')
        // .then(out => {
        //     src('smart.stages_users')
        //         .select()
        //         .where(_.pick(out, ['docking_id']))
        //         .then(enrolls => enrolls.map(sendInvite))
        //         .then(() => res.status(200).jsonp(out))
        // })
        .then(out => res.status(200).jsonp(out))
        .catch(err => res.status(404).jsonp(err));
});

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
router.patch('/:docking_id', auth, function (req, res, next) {
    console.log('HERE')
    db('smart.dockings')
        .update(_.omit(req.body, ['docking_id', 'stage_id', 'vessel_id', 'duv']), { patch: true })
        .where(_.pick(req.params, ['docking_id']))
        .returning('*')
        // .then( advertise('docking_id') )

        .then(out => res.status(200).jsonp(out))
        .catch(err => res.status(404).jsonp(err));
});

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

router.get('/:docking_id/stages', function (req, res, next) {
    db('smart.stages')
        .select()
        .where(req.params)
        .then(out => res.status(200).jsonp(out))
        .catch(err => res.status(404).jsonp(err));
});


///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
// ALTERAR ESTIMATIVAS
router.post('/:docking_id/et/:stage_id/', auth, function (req, res, next) {
    const fields = ['ets', 'etf', 'assign_id'];
    db('smart.stages')
        .update(_.pick(req.body, fields), { patch: true })
        .where(req.params)
        .returning('*')
        .then(advertise('stage_id'))
        .then(out => res.status(200).jsonp(out))
        .catch(err => res.status(404).jsonp(err));
});

// ALTERAR Efetivas
router.post('/:docking_id/at/:stage_id/', auth, function (req, res, next) {
    const fields = ['ats', 'atf', 'assign_id'];
    db('smart.stages')
        .update(_.pick(req.body, fields), { patch: true })
        .where(req.params)
        .returning('*')
        .then(advertise('stage_id'))
        .then(out => res.status(200).jsonp(out))
        .catch(err => res.status(404).jsonp(err));
});

module.exports = router;