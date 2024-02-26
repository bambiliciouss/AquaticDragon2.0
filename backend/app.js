const express = require("express");
const app = express();
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
const errorMiddleware = require("./middlewares/errors");

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
app.use(errorMiddleware);

module.exports = app;
