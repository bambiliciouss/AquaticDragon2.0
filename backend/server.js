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
// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('New client connected');

  // Handle client disconnection
  socket.on('disconnect', () => {
      console.log('Client disconnected');
  });

  // Handle 'notification' event from client
  socket.on('newOrder', async (data) => {
    const {message, branch} = data;
    try{
      const adminId = (await getAdminIdFromBranch(branch)).toString();
      console.log("adminsockets: ", adminSockets)
      console.log("admin: " ,adminSockets[adminId]);
      console.log('Received notification in server:', message);
      // Broadcast the received message to all connected clients
      notifyAdmin(io, adminId, adminSockets, message);
    }catch(error){
      console.log(error);
    }
      
  });
  socket.on('login',(data)=>{
    const {adminId}  = data;
    adminSockets[adminId] = socket.id;
    console.log(`Added admin: ${adminId} to adminSockets`)
    console.log(adminSockets)
  })
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
