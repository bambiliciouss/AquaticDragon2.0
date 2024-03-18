const cron = require("node-cron");
const BusinessPermit = require("../models/businesspermit");

const notifyBusinessP = async () => {
  // Pass req as a parameter
  try {
    const bPermit = await BusinessPermit.aggregate([
      {
        $match: {
          deleted: false,
        },
      },
      {
        $sort: {
          storebranch: 1,
          dateIssued: -1,
          createdAt: -1,
        },
      },
      {
        $group: {
          _id: "$storebranch",
          bPermit: { $first: "$$ROOT" },
        },
      },
    ]);

    for (const healthStatus of bPermit) {
      const { bPermit } = healthStatus;

      const lastHealthStatusDate = new Date(bPermit.dateIssued);
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

      if (lastHealthStatusDate < oneYearAgo) {
        console.log(
          `Business Permit expired please renew the store ${bPermit.storebranch}`
        );
      }
    }
    console.log("Business Permit Notification check complete.");
  } catch (error) {
    console.error("Error in notification check:", error);
  }
};

// // Schedule the cron job to run annually
cron.schedule("0 0 1 1 *", async () => {
  await notifyBusinessP();
});

module.exports = notifyBusinessP;
