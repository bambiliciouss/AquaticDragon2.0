const Notification = require('../models/notification');
const User = require('../models/user');
const Order = require('../models/order');
const mongoose = require('mongoose');
const RiderNotification = require('../models/riderNotification');
const CustomerNotification = require('../models/customerNotification');

exports.storeCustomerNotification = async (message, title, orderId, customerId) => {
    try {
        const notification = await CustomerNotification.create({
            message,
            title,
            order: orderId,
            userID: customerId,
        });
        return notification;
    } catch (error) {
        console.log(error);
    }

}
exports.fetchCustomerNotification = async (customerId) => {
    try {
        const notifications = await CustomerNotification.find({ userID: customerId, read: false });
        return notifications;
    } catch (error) {
        console.log(error);
    }

}
exports.readCustomerNotification = async (notificationId) => {
    try {
        await CustomerNotification.findByIdAndUpdate(notificationId, { read: true }, { new: true });
    } catch (error) {
        console.error("Error marking notification as read", error);
    }
}
exports.storeRiderNotification = async (message, title, orderId, riderId) => {
    try{
        const notification = await RiderNotification.create({
            message,
            title,
            order: orderId,
            userID: riderId,
        });
        return notification;
    }catch(error){
        console.log(error);
    }
}

exports.fetchRiderNotification = async (riderId)=>{
    try{
        const notifications = await RiderNotification.find({userID: riderId, read: false});
        return notifications;
    }catch(error){
        console.log(error);
    }

}
exports.readRiderNotification = async (notificationId) => {
    try {
        await RiderNotification.findByIdAndUpdate(notificationId, { read: true }, { new: true });
    } catch (error) {
        console.error("Error marking notification as read", error);
    }

}

exports.storeNotification = async (message, title, orderItems, orderProducts, adminId, orderId) => {
    try {
        
        const order = await Order.findById(orderId);

        const notification = await Notification.create({
            message,
            title,
            orders: {
                orderItems,
                orderProducts,
                _id: order._id,
            },
            userID: adminId,
        });
        console.log('stored in notifications')
        return notification;

    } catch (error) {
        console.log(error);
    }
}

exports.fetchNotification = async (adminId) => {
    try {
        const notifications = await Notification.find({ userID: { $in: adminId }, read: false });
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