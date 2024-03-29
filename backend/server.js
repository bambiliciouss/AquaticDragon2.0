const app = require("./app");
const connectDatabase = require("./config/database");
const autoAgeUp = require("./config/updateAgeAuto");
const notifyCleaning = require("./config/machineCleaningNotif");
const barangayhealth = require("./config/barangayHealthNotif");
const phychem = require("./config/phychemtestNotif");
const notifyBusinessP = require("./config/businessPermit");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary");

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

app.listen(process.env.PORT, () => {
  console.log(
    `server started on port:' ${process.env.PORT} in ${process.env.NODE_ENV} mode`
  );
});
