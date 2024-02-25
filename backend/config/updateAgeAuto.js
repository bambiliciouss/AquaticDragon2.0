// cronJob.js
const mongoose = require("mongoose");
const cron = require("node-cron");

const Gallon = mongoose.model("Gallon");

const autoAgeUp = async () => {
  try {
    const gallons = await Gallon.find();
    gallons.forEach(async (gallon) => {
      const currentDate = new Date();
      const createdAtDate = gallon.createdAt;
      const ageInMilliseconds = currentDate - createdAtDate;

      gallon.gallonAge = Math.round(ageInMilliseconds / (1000 * 60 * 60 * 24));
      await gallon.save();
    });
    console.log("Gallon ages updated successfully.");
  } catch (error) {
    console.error("Error updating gallon ages:", error);
  }
};

// Schedule the task to run every 1day
cron.schedule("0 0 * * *", autoAgeUp);

// Export the function if needed
module.exports = autoAgeUp;
