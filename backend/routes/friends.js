const express = require('express');
const router = express.Router();
const friendController = require('../controllers/friendController');
const auth = require('../middleware/auth');

// Send friend request
router.post('/request', auth, friendController.sendFriendRequest);

// Accept/Reject friend request
router.put('/request/:requestId', auth, friendController.respondToFriendRequest);

// Get pending friend requests
router.get('/requests/pending', auth, friendController.getPendingRequests);

// Get friends list
router.get('/', auth, friendController.getFriends);

module.exports = router;