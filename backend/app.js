const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const auth = require("./routes/auth");
const gallon = require("./routes/gallon");
const storeBranch = require("./routes/storeBranch");
const order = require("./routes/order");
const typeofgallon = require("./routes/typeofgallon")
const errorMiddleware = require("./middlewares/errors");

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", auth);
app.use("/api/v1", gallon);
app.use("/api/v1", storeBranch);
app.use("/api/v1", order);
app.use("/api/v1", typeofgallon);
app.use(errorMiddleware);

module.exports = app;
