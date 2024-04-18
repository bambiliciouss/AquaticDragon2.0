console.log("server started running");
const app = require("./app");
const http = require("http");

const server = http.createServer(app);
const socketIo = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
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
const {
  getAdminIdFromBranch,
  notifyAdmin,
  getEmployeeIdFromBranch,
  getRiderBranchFromId,
  getUserIdAndBranchFromOrder,
} = require("./utils/utils");
const {
  storeNotification,
  fetchNotification,
  markAsRead,
  storeRiderNotification,
  fetchRiderNotification,
  readRiderNotification,
  storeCustomerNotification,
  fetchCustomerNotification,
  readCustomerNotification,
  fetchRenewalNotification,
  readRenewalNotification,
} = require("./controllers/notificationController");
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
let customerSockets = {};
let orderItems = [];
let orderProducts = [];
// Socket.io connection handling
io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("disconnect", () => {
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
    for (let customerId in customerSockets) {
      const socketIndex = customerSockets[customerId].indexOf(socket.id);
      if (socketIndex !== -1) {
        customerSockets[customerId].splice(socketIndex, 1);
      }
    }
  });

  socket.on("updateOrder", async (data) => {
    const { id, orderLevelup } = data;
    const order = await getUserIdAndBranchFromOrder(id);

    await storeCustomerNotification(
      orderLevelup,
      order.selectedStore.branchNo,
      id,
      order.customer
    );
    const notification = await fetchCustomerNotification(order.customer);
    console.log("stored notification", notification);
    if (
      customerSockets[order.customer] &&
      customerSockets[order.customer].length > 0
    ) {
      customerSockets[order.customer].forEach((socketId) => {
        io.to(socketId).emit("customerNotification", notification);
      });
    }
    // console.log('user', user);
    // console.log('storeBranch', storeBranch);
  });
  socket.on("containerForPickup", async (data) => {
    const { id, orderLevelup, assignedRider } = data;
    const riderBranch = await getRiderBranchFromId(assignedRider);

    await storeRiderNotification(orderLevelup, riderBranch, id, assignedRider);
    const notification = await fetchRiderNotification(assignedRider);
    console.log("stored notification", notification);
    if (riderSockets[assignedRider] && riderSockets[assignedRider].length > 0) {
      riderSockets[assignedRider].forEach((socketId) => {
        io.to(socketId).emit("riderNotification", notification);
      });
    }
  });
  socket.on("newOrder", async (data) => {
    const { message, branch, title, order } = data;
    try {
      const adminId = await getAdminIdFromBranch(branch);
      const employees = await getEmployeeIdFromBranch(branch);
      const adminAndEmployees = [
        adminId,
        ...employees.map((employee) => employee._id),
      ];

      orderItems = order.orderItems;
      orderProducts = order.orderProducts;
      await storeNotification(
        message,
        title,
        orderItems,
        orderProducts,
        adminAndEmployees,
        order._id
      );
      const notifications = await fetchNotification(adminAndEmployees);
      console.log("notifications", notifications);
      for (let userId of adminAndEmployees) {
        // Convert userId to string to use as key
        const userIdStr = String(userId);

        if (adminSockets[userIdStr] && adminSockets[userIdStr].length > 0) {
          // Emit the 'notification' event to all socket IDs for the admin ID
          adminSockets[userIdStr].forEach((socketId) => {
            io.to(socketId).emit("notification", notifications);
            io.to(socketId).emit("newOrder");
          });
        }

        if (
          employeeSockets[userIdStr] &&
          employeeSockets[userIdStr].length > 0
        ) {
          // Emit the 'notification' event to all socket IDs for the employee ID
          employeeSockets[userIdStr].forEach((socketId) => {
            io.to(socketId).emit("notification", notifications);
            io.to(socketId).emit("newOrder");
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  });
  socket.on("login", async (data) => {
    const { userID, role } = data;
    if (role === "admin") {
      // If the adminId is not in adminSockets, add an empty array
      if (!adminSockets[userID]) {
        adminSockets[userID] = [];
      }
      // Only add the socket ID if it's not already in the array
      if (!adminSockets[userID].includes(socket.id)) {
        adminSockets[userID].push(socket.id);
      }
      console.log(`Added admin: ${userID} to adminSockets`);
      console.log("adminsocket", adminSockets);

      const notifications = await fetchNotification(userID);
      const renewalNotifications = await fetchRenewalNotification(userID);
      console.log("renewalNotifications", renewalNotifications);
      // Emit the 'notification' event only to the socket that triggered the 'login' event
      socket.emit("notifyAdmin", renewalNotifications);
      socket.emit("notification", notifications);
    } else if (role === "employee") {
      if (!employeeSockets[userID]) {
        employeeSockets[userID] = [];
      }
      if (!employeeSockets[userID].includes(socket.id)) {
        employeeSockets[userID].push(socket.id);
      }
      console.log(`Added employee: ${userID} to employeeSockets`);
      console.log("employee socket", employeeSockets);
      const notifications = await fetchNotification(userID);

      // Emit the 'notification' event only to the socket that triggered the 'login' event
      socket.emit("notification", notifications);
    } else if (role === "rider") {
      if (!riderSockets[userID]) {
        riderSockets[userID] = [];
      }
      if (!riderSockets[userID].includes(socket.id)) {
        riderSockets[userID].push(socket.id);
      }
      console.log(`Added rider: ${userID} to riderSockets`);
      console.log("rider socket", riderSockets);
      const notifications = await fetchRiderNotification(userID);

      // Emit the 'notification' event only to the socket that triggered the 'login' event
      socket.emit("riderNotification", notifications);
    } else if (role === "user") {
      if (!customerSockets[userID]) {
        customerSockets[userID] = [];
      }
      if (!customerSockets[userID].includes(socket.id)) {
        customerSockets[userID].push(socket.id);
      }
      console.log(`Added user: ${userID} to customerSockets`);
      console.log("customer socket", customerSockets);
      const notification = await fetchCustomerNotification(userID);
      socket.emit("customerNotification", notification);
    }
  });
  socket.on("fetchRenewalNotification", async (data) => {
    const { adminId } = data;
    const renewalNotifications = await fetchRenewalNotification(adminId);
    console.log("renewalNotifications", renewalNotifications);
    // Emit the 'notification' event only to the socket that triggered the 'login' event
    socket.emit("notifyAdmin", renewalNotifications);
  });
  socket.on("readNotification", async (data) => {
    const { notificationId, adminId } = data;
    await markAsRead(notificationId);
    const notifications = await fetchNotification(adminId);

    socket.emit("notification", notifications);
  });
  socket.on("readRiderNotification", async (data) => {
    const { notificationId, riderId } = data;
    await readRiderNotification(notificationId);
    const notifications = await fetchRiderNotification(riderId);

    socket.emit("riderNotification", notifications);
  });
  socket.on("readRenewalNotification", async (data) => {
    const { notificationId, adminId } = data;
    await readRenewalNotification(notificationId);
    const notifications = await fetchRenewalNotification(adminId);
    socket.emit("notifyAdmin", notifications);
  });
  socket.on("readCustomerNotification", async (data) => {
    const { notificationId, customerId } = data;
    await readCustomerNotification(notificationId);
    const notifications = await fetchCustomerNotification(customerId);

    socket.emit("customerNotification", notifications);
  });
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

console.log("about to call notifyAdmin");
// Calculate the number of milliseconds in one day
// const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
const seconds = 10 * 1000;
const minute = 60 * 1000;
// Run notifyAdmin() immediately when the server starts
(async () => {
  await notifyAdmin(io);
  // Then run notifyAdmin() every day
  setInterval(async () => {
    try {
      await notifyAdmin(io);
      console.log("emitted");
    } catch (error) {
      console.error("Error in notifyAdmin:", error);
    }
  }, minute);
})();
