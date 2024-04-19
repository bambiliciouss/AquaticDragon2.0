const mongoose = require('mongoose');

const renewalNotifcationSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    businessPermitID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BusinessPermit',
    },
    PhyChemID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PhyChemTest',
    },
    PotabilityID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BarangayHealth',
    },
    MachineCleaningID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MachineCleaning',
    },
    userID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    documentType: {
        type: String,
        required: true,
    },
    read: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});



module.exports = mongoose.model('RenewalNotification', renewalNotifcationSchema);