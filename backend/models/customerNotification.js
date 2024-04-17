const mongoose = require('mongoose');

const customerNotificationSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true,
    },
    userID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    read: {
        type: Boolean,
        default: false,
    }
});



module.exports = mongoose.model('CustomerNotification', customerNotificationSchema);