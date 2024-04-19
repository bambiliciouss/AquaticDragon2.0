const express = require("express");
const app = express();
const cors = require('cors');
const cookieParser = require("cookie-parser");
const auth = require("./routes/auth");
const gallon = require("./routes/gallon");
const storeBranch = require("./routes/storeBranch");
const order = require("./routes/order");
const typeofgallon = require("./routes/typeofgallon");
const storeStaff = require("./routes/storestaff");
const machineCleaning = require("./routes/machinecleaning");
const product = require("./routes/product");
const barangayhealth = require("./routes/barangayhealth");
const othergalloninventory = require("./routes/othergalloninventory");
const phyChemTest = require("./routes/phychemtest");
const businesspermit = require("./routes/businesspermit");
const storeaddress = require("./routes/storeaddress");
const superadmin = require("./routes/superadmin");
const review = require('./routes/review')
const errorMiddleware = require("./middlewares/errors");

app.use(cookieParser());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));


app.use("/api/v1", review);
app.use("/api/v1", auth);
app.use("/api/v1", gallon);
app.use("/api/v1", storeBranch);
app.use("/api/v1", order);
app.use("/api/v1", typeofgallon);
app.use("/api/v1", storeStaff);
app.use("/api/v1", machineCleaning);
app.use("/api/v1", product);
app.use("/api/v1", barangayhealth);
app.use("/api/v1", othergalloninventory);
app.use("/api/v1", phyChemTest);
app.use("/api/v1", businesspermit);
app.use("/api/v1", storeaddress);
app.use("/api/v1", superadmin);
app.use(errorMiddleware);

module.exports = app;
