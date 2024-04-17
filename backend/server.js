const app = require("./app");
const http = require("http");

const server = http.createServer(app);
const socketIo = require("socket.io")(server, {
  cors: {
    origin: "*"
  }
});
const io = socketIo;
const connectDatabase = require("./config/database");
const autoAgeUp = require("./config/updateAgeAuto");
const notifyCleaning = require("./config/machineCleaningNotif");
const barangayhealth = require("./config/barangayHealthNotif");
const phychem = require("./config/phychemtestNotif");
const notifyBusinessP = require("./config/businessPermit");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary");
const { getAdminIdFromBranch, notifyAdmin, getEmployeeIdFromBranch, getRiderBranchFromId } = require("./utils/utils");
const { storeNotification, fetchNotification, markAsRead, storeRiderNotification, fetchRiderNotification, readRiderNotification } = require('./controllers/notificationController')
dotenv.config({ path: "config/.env" });
connectDatabase();
// autoAgeUp();
// notifyCleaning();
// barangayhealth();
// phychem();
// notifyBusinessP();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

let adminSockets = {};
let employeeSockets = {};
let riderSockets = {};
let orderItems = [];
let orderProducts = [];
// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('disconnect', () => {
    for (let adminId in adminSockets) {
      const socketIndex = adminSockets[adminId].indexOf(socket.id);
      if (socketIndex !== -1) {
        adminSockets[adminId].splice(socketIndex, 1);
      }
    }
    for (let employeeId in employeeSockets) {
      const socketIndex = employeeSockets[employeeId].indexOf(socket.id);
      if (socketIndex !== -1) {
        employeeSockets[employeeId].splice(socketIndex, 1);
      }
    }
    for (let riderId in riderSockets) {
      const socketIndex = riderSockets[riderId].indexOf(socket.id);
      if (socketIndex !== -1) {
        riderSockets[riderId].splice(socketIndex, 1);
      }
    }
  });

  socket.on('containerForPickup', async (data)=>{
    const {id, orderLevelup, assignedRider}  = data;
    const riderBranch = (await getRiderBranchFromId(assignedRider))
    console.log('branch', riderBranch)
    console.log('id', id);
    console.log('orderlevelup', orderLevelup);
    console.log('assignedRider', assignedRider);
    await storeRiderNotification(orderLevelup,riderBranch, id, assignedRider);
    const notification = await fetchRiderNotification(assignedRider);
    console.log('stored notification', notification);
    if (riderSockets[assignedRider] && riderSockets[assignedRider].length > 0) {
      riderSockets[assignedRider].forEach(socketId => {
        io.to(socketId).emit('riderNotification', notification);
      });
    }
  })
  socket.on('newOrder', async (data) => {
    const { message, branch, title, order } = data;
    try {
      const adminId = (await getAdminIdFromBranch(branch));
      const employees = (await getEmployeeIdFromBranch(branch))
      const adminAndEmployees = [adminId, ...employees.map(employee => employee._id)]
    
      orderItems = order.orderItems;
      orderProducts = order.orderProducts;
      await storeNotification(message, title, orderItems, orderProducts, adminAndEmployees, order._id);
      const notifications = await fetchNotification(adminAndEmployees);
      console.log('notifications', notifications);
      for (let userId of adminAndEmployees) {
        // Convert userId to string to use as key
        const userIdStr = String(userId);
      
        if (adminSockets[userIdStr] && adminSockets[userIdStr].length > 0) {
          // Emit the 'notification' event to all socket IDs for the admin ID
          adminSockets[userIdStr].forEach(socketId => {
            io.to(socketId).emit('notification', notifications);
            io.to(socketId).emit('newOrder');
          });
        }
      
        if (employeeSockets[userIdStr] && employeeSockets[userIdStr].length > 0) {
          // Emit the 'notification' event to all socket IDs for the employee ID
          employeeSockets[userIdStr].forEach(socketId => {
            io.to(socketId).emit('notification', notifications);
            io.to(socketId).emit('newOrder');
          });
        }
      }

    } catch (error) {
      console.log(error);
    }

  });
  socket.on('login', async (data) => {
    const { userID, role } = data;
    if (role === 'admin') {
      // If the adminId is not in adminSockets, add an empty array
      if (!adminSockets[userID]) {
        adminSockets[userID] = [];
      }
      // Only add the socket ID if it's not already in the array
      if (!adminSockets[userID].includes(socket.id)) {
        adminSockets[userID].push(socket.id);
      }
      console.log(`Added admin: ${userID} to adminSockets`)
      console.log('adminsocket', adminSockets)
      const notifications = await fetchNotification(userID);

      // Emit the 'notification' event only to the socket that triggered the 'login' event
      socket.emit('notification', notifications);
    }
    else if (role==='employee'){
      if (!employeeSockets[userID]) {
        employeeSockets[userID] = [];
      }
      if (!employeeSockets[userID].includes(socket.id)) {
        employeeSockets[userID].push(socket.id);
      }
      console.log(`Added employee: ${userID} to employeeSockets`)
      console.log('employee socket',employeeSockets)
      const notifications = await fetchNotification(userID);

      // Emit the 'notification' event only to the socket that triggered the 'login' event
      socket.emit('notification', notifications);
    }
    else if (role ==='rider'){
      if (!riderSockets[userID]) {
        riderSockets[userID] = [];
      }
      if (!riderSockets[userID].includes(socket.id)) {
        riderSockets[userID].push(socket.id);
      }
      console.log(`Added rider: ${userID} to riderSockets`)
      console.log('rider socket',riderSockets)
      const notifications = await fetchRiderNotification(userID);

      // Emit the 'notification' event only to the socket that triggered the 'login' event
      socket.emit('riderNotification', notifications);
    }

  })

  socket.on('readNotification', async (data) => {
    const { notificationId, adminId } = data;
    await markAsRead(notificationId);
    const notifications = await fetchNotification(adminId);

    socket.emit('notification', notifications);
  })
  socket.on('readRiderNotification', async (data) => {
    const { notificationId, riderId } = data;
    await readRiderNotification(notificationId);
    const notifications = await fetchRiderNotification(riderId);

    socket.emit('riderNotification', notifications);
  })
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
