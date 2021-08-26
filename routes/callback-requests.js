let uniqid = require('uniqid');
let CallbackRequest = require('../models/callback-requests').CallbackRequest;
let express = require('express');
let router = express.Router();
let authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware, async (req, resp) => {
    let cbs = await CallbackRequest.find();
    resp.send(cbs);
});
router.post('/', async (req, resp) => {
    let reqBody = req.body;
    let newRequest = new CallbackRequest({
        id: uniqid(),
        phoneNumber: reqBody.phoneNumber,
        date: new Date()
    })
    await newRequest.save();
    resp.send('Accepted!')
});
router.delete('/:id', authMiddleware, async (req, resp) => {
    let id = req.params.id;
    await CallbackRequest.deleteOne({id: id});
    resp.send('Deleted!')
});

module.exports = router;