const cron = require("node-cron");
const PhyChemTest = require("../models/phychemtest");

const notifyPhyChem = async () => {
  try {
    const latestHealthStatus = await PhyChemTest.aggregate([
      {
        $match: {
          deleted: false,
        },
      },
      {
        $sort: {
          storebranch: 1,
          dateTested: -1,
          createdAt: -1,
        },
      },
      {
        $group: {
          _id: {
            storebranch: "$storebranch",
            dateTested: "$dateTested",
          },
          latestHealthStatus: { $first: "$$ROOT" },
        },
      },
    ]);

    for (const healthStatus of latestHealthStatus) {
      const { latestHealthStatus } = healthStatus;

      const lastHealthStatusDate = new Date(latestHealthStatus.dateTested);
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

      if (lastHealthStatusDate < sixMonthsAgo) {
        console.log(
          `Physical and Chemical Testing need to apply in store ${latestHealthStatus.storebranch}`
        );
      }
    }
    console.log("Phy and Chem Cert Notification check complete.");
  } catch (error) {
    console.error("Error in notification check:", error);
  }
};

cron.schedule("0 0 * * *", async () => {
  await notifyHealthStatus();
});

module.exports = notifyPhyChem;
