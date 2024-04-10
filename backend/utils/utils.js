const StoreBranch = require("../models/storeBranch")

exports.getAdminIdFromBranch = async (branch) => {
    const adminId = await StoreBranch.findById(branch).select('user');
    return adminId.user;
}

exports.notifyAdmin = (io, adminId, adminSockets, message)=>{
    const socketId = adminSockets[adminId];
    if (socketId){
        io.to(socketId).emit("newOrder", message);
    }
    
}