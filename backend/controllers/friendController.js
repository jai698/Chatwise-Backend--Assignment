const User = require('../models/UserSchema');

exports.sendFriendRequest = async (req, res) => {
  try {
    const { receiverId } = req.body;
    const senderId = req.user._id;

    // Check if users exist
    const receiver = await User.findById(receiverId);
    if (!receiver) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if request already exists
    const existingRequest = receiver.friendRequests.find(
      request => request.from.toString() === senderId.toString()
    );
    
    if (existingRequest) {
      return res.status(400).json({ error: 'Friend request already sent' });
    }

    // Check if they're already friends
    if (receiver.friends.includes(senderId)) {
      return res.status(400).json({ error: 'Users are already friends' });
    }

    // Add friend request
    receiver.friendRequests.push({
      from: senderId,
      status: 'pending'
    });

    await receiver.save();
    res.status(200).json({ message: 'Friend request sent successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.respondToFriendRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { status } = req.body; // 'accepted' or 'rejected'
    const userId = req.user._id;

    if (!['accepted', 'rejected'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const user = await User.findById(userId);
    const request = user.friendRequests.id(requestId);

    if (!request) {
      return res.status(404).json({ error: 'Friend request not found' });
    }

    if (request.status !== 'pending') {
      return res.status(400).json({ error: 'Request already processed' });
    }

    request.status = status;

    if (status === 'accepted') {
      // Add both users to each other's friends list
      user.friends.push(request.from);
      const sender = await User.findById(request.from);
      sender.friends.push(userId);
      await sender.save();
    }

    await user.save();
    res.json({ message: `Friend request ${status}` });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getPendingRequests = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('friendRequests.from', 'username email');

    const pendingRequests = user.friendRequests.filter(
      request => request.status === 'pending'
    );

    res.json(pendingRequests);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getFriends = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('friends', 'username email');
    res.json(user.friends);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};