const schedule = require("node-schedule");
const mongoose = require("mongoose");
const Gallon = require("../models/gallon"); // Update the path accordingly

const updateGallonAgesJob = () => {
  schedule.scheduleJob("0 0 * * *", async () => {
    try {
      await mongoose.connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      const currentDate = new Date();
      const gallons = await Gallon.find();

      gallons.forEach(async (gallon) => {
        const createdAtDate = new Date(gallon.createdAt);
        const daysDifference = Math.floor(
          (currentDate - createdAtDate) / (1000 * 60 * 60 * 24)
        );

        // Update gallonAge
        gallon.gallonAge = daysDifference + 1;
        await gallon.save();
      });

      console.log("GallonAge update job scheduled.");
    } catch (error) {
      console.error("Error connecting to the database:", error);
    }
  });
};

module.exports = updateGallonAgesJob;
