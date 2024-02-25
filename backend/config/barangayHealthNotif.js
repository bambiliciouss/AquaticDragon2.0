const cron = require("node-cron");
const BarangayHealth = require("../models/barangayhealth");

// Controller to notify health status based on the most recent record per storebranch and dateVisited
// const notifyHealthStatus = async (req, res) => {
const notifyHealthStatus = async () => {
  try {
    // Get the latest health status record per storebranch and dateVisited
    const latestHealthStatus = await BarangayHealth.aggregate([
      {
        $match: {
          deleted: false,
        },
      },
      {
        $sort: {
          storebranch: 1,
          dateVisited: -1,
          createdAt: -1,
        },
      },
      {
        $group: {
          _id: {
            storebranch: "$storebranch",
            dateVisited: "$dateVisited",
          },
          latestHealthStatus: { $first: "$$ROOT" },
        },
      },
    ]);

    // Iterate through the latest health status records
    for (const healthStatus of latestHealthStatus) {
      const { latestHealthStatus } = healthStatus;

      // Check if the last health status record is more than 1 month old
      const lastHealthStatusDate = new Date(latestHealthStatus.dateVisited);
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

      if (lastHealthStatusDate < oneMonthAgo) {
        // Send a notification message (replace this with your actual notification logic)
        // console.log(
        //   `Send notification to user ${latestHealthStatus.user} for storebranch ${latestHealthStatus.storebranch}`
        // );
        console.log(
          ` Expect Barangay Health Officer to Visit storebranch ${latestHealthStatus.storebranch}`
        );
      }
    }
    console.log("Health Status Notification check complete.");
    // res
    //   .status(200)
    //   .json({ message: "Health Status Notification check complete." });
  } catch (error) {
    console.error("Error in notification check:", error);
  }
};

cron.schedule("0 0 * * *", async () => {
  await notifyHealthStatus();
});

module.exports = notifyHealthStatus;
