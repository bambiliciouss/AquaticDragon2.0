const StoreBranch = require("../models/storeBranch")
const TypeOfGallon = require("../models/typeofgallon")
exports.getAdminIdFromBranch = async (branch) => {
    const adminId = await StoreBranch.findById(branch).select('user');
    return adminId.user;
}
exports.getProductTypeName = async (productType) => {
    const name = await TypeOfGallon.findById(productType).select('typeofGallon');
    return name.typeofGallon;
}
exports.notifyAdmin = async (io, adminId, adminSockets, message, title, orderItems, orderProducts)=>{
    const socketId = adminSockets[adminId];

    if (orderProducts && orderProducts.length > 0){
        orderProducts = await Promise.all(orderProducts.map(async (product) => {
            const name = await this.getProductTypeName(product.type);
            return { ...product, type: name }
        }))
    }
   console.log("orderProducts", orderProducts);
    if (socketId){
        io.to(socketId).emit("newOrder", {title: title,message: message, orderItems: orderItems, orderProducts: orderProducts});
    }
    
}