const Notification = require('../models/notification');
const User = require('../models/user');
const Order = require('../models/order');
const mongoose = require('mongoose');

exports.storeNotification = async (message, title, orderItems, orderProducts, adminId, orderId) => {
    try {
        const user = await User.findById(adminId);
        const order = await Order.findById(orderId);

        const notification = await Notification.create({
            message,
            title,
            orders: {
                orderItems,
                orderProducts,
                _id: order._id,
            },
            adminId: user._id,
        });
        console.log('stored in notifications')
        return notification;

    } catch (error) {
        console.log(error);
    }
}

exports.fetchNotification = async (adminId) => {
    try {
        const notifications = await Notification.find({ adminId: adminId, read: false });
        return notifications;
    } catch (error) {
        console.log(error)
    }
}

exports.markAsRead = async (notificationId) => {
    try {
        await Notification.findByIdAndUpdate(notificationId, { read: true }, { new: true });
    } catch (error) {
        console.error("Error marking notification as read", error);
    }
}