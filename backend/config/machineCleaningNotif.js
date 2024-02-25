const cron = require("node-cron");
const MachineCleaning = require("../models/machinecleaning");

// Controller to notify cleaning based on the most recent record per storebranch

// const notifyCleaning = async () => {
//   try {
//     // Get the latest cleaning record per storebranch
//     const latestCleanings = await MachineCleaning.aggregate([
//       {
//         $match: {
//           deleted: false,
//         },
//       },
//       {
//         $sort: {
//           storebranch: 1,
//           createdAt: -1,
//         },
//       },
//       {
//         $group: {
//           _id: "$storebranch",
//           latestCleaning: { $first: "$$ROOT" },
//         },
//       },
//     ]);

//     // Iterate through the latest cleaning records
//     for (const cleaning of latestCleanings) {
//       const { latestCleaning } = cleaning;

//       // Check if the last cleaning record is more than a month old
//       const lastCleaningDate = new Date(latestCleaning.createdAt);
//       const oneMonthAgo = new Date();
//       oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 6);

//       if (lastCleaningDate < oneMonthAgo) {
//         // Send a notification message (replace this with your actual notification logic)
//         console.log(
//           `Send notification to user ${latestCleaning.user} for storebranch ${latestCleaning.storebranch}`
//         );
//       }
//     }

//     console.log("Machine Cleaning Notification check complete.");
//   } catch (error) {
//     console.error("Error in notification check:", error);
//   }
// };

const notifyCleaning = async () => {
  try {
    // Get the latest cleaning record per storebranch
    const latestCleanings = await MachineCleaning.aggregate([
      {
        $match: {
          deleted: false,
        },
      },
      {
        $sort: {
          storebranch: 1,
          createdAt: -1,
        },
      },
      {
        $group: {
          _id: "$storebranch",
          latestCleaning: { $first: "$$ROOT" },
        },
      },
    ]);

    // Iterate through the latest cleaning records
    for (const cleaning of latestCleanings) {
      const { latestCleaning } = cleaning;

      // Check if the last cleaning record is more than 6 months old
      const lastCleaningDate = new Date(latestCleaning.createdAt);
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

      if (lastCleaningDate < sixMonthsAgo) {
        // Send a notification message (replace this with your actual notification logic)
        // console.log(
        //   `Send notification to user ${latestCleaning.user} for storebranch ${latestCleaning.storebranch}`
        // );
        console.log(
            ` You need cleaning in storebranch ${latestCleaning.storebranch}`
          );
      }
    }

    console.log("Machine Cleaning Notification check complete.");
  } catch (error) {
    console.error("Error in notification check:", error);
  }
};

//3 MINUTES TO FOR TESTING
// const notifyCleaning = async () => {
//   try {
//     // Get the latest cleaning record per storebranch
//     const latestCleanings = await MachineCleaning.aggregate([
//       {
//         $match: {
//           deleted: false,
//         },
//       },
//       {
//         $sort: {
//           storebranch: 1,
//           createdAt: -1,
//         },
//       },
//       {
//         $group: {
//           _id: "$storebranch",
//           latestCleaning: { $first: "$$ROOT" },
//         },
//       },
//     ]);

//     // Iterate through the latest cleaning records
//     for (const cleaning of latestCleanings) {
//       const { latestCleaning } = cleaning;

//       // Check if the last cleaning record is more than 3 minutes old
//       const lastCleaningDate = new Date(latestCleaning.createdAt);
//       const threeMinutesAgo = new Date();
//       threeMinutesAgo.setMinutes(threeMinutesAgo.getMinutes() - 3);

//       if (lastCleaningDate < threeMinutesAgo) {
//         // Send a notification message (replace this with your actual notification logic)
//         //   console.log(
//         //     `Send notification to user ${latestCleaning.user} for storebranch ${latestCleaning.storebranch}`
//         //   );
//         console.log(
//           `storebranch ${latestCleaning.storebranch} You need cleaning`
//         );
//       }
//     }

//     console.log("Notification check complete.");
//   } catch (error) {
//     console.error("Error in notification check:", error);
//   }
// };

// Schedule the task to run every 2 minutes
// cron.schedule("*/1 * * * *", async () => {
//   await notifyCleaning();
// });

cron.schedule("0 0 * * *", async () => {
  await notifyCleaning();
});

module.exports = notifyCleaning;
