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
const { getAdminIdFromBranch, notifyAdmin } = require("./utils/utils");
const { storeNotification, fetchNotification, markAsRead } = require('./controllers/notificationController')
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
  });

  // Handle 'notification' event from client
  socket.on('newOrder', async (data) => {
    const { message, branch, title, order } = data;
    try {
      const adminId = (await getAdminIdFromBranch(branch)).toString();

      console.log('Received notification in server:', message);
      console.log('order: ', order)

      orderItems = order.orderItems;
      orderProducts = order.orderProducts;
      await storeNotification(message, title, orderItems, orderProducts, adminId, order._id);
      const notifications = await fetchNotification(adminId);
      if (adminSockets[adminId] && adminSockets[adminId].length > 0) {
        // Emit the 'notification' event to all socket IDs for the admin ID
        adminSockets[adminId].forEach(socketId => {
          io.to(socketId).emit('notification', notifications);
        });
      }

    } catch (error) {
      console.log(error);
    }

  });
  socket.on('login', async (data) => {
    const { adminId } = data;
    // If the adminId is not in adminSockets, add an empty array
    if (!adminSockets[adminId]) {
      adminSockets[adminId] = [];
    }
    // Only add the socket ID if it's not already in the array
    if (!adminSockets[adminId].includes(socket.id)) {
      adminSockets[adminId].push(socket.id);
    }
    console.log(`Added admin: ${adminId} to adminSockets`)
    console.log(adminSockets)
    const notifications = await fetchNotification(adminId);

    // Emit the 'notification' event only to the socket that triggered the 'login' event
    socket.emit('notification', notifications);
  })

  socket.on('readNotification', async (data) => {
    const { notificationId, adminId } = data;
    await markAsRead(notificationId);
    const notifications = await fetchNotification(adminId);
   
    socket.emit('notification', notifications);
  })
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
