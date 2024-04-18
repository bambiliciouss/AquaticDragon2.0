const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  orders: {
    orderItems: {
      type: Array,
      required: true,
    },
    orderProducts: {
      type: Array,
      required: true,
    },
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
    }
  },
  userID: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }],
  read: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});



module.exports = mongoose.model('Notification', notificationSchema);