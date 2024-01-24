const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },

  orderItems: [
    {
      gallon: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Gallon",
      },
      quantity: {
        type: Number,
        default: 1,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  containerStatus: {
    type: String,
    required: true,
  },

  orderclaimingOption: {
    type: String,
    required: true,
  },

  storeBranch: [
    {
      store: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "StoreBranch",
      },
      deliveryFee: {
        type: Number,
        required: true,
      },
    },
  ],

  pickupAddress: [
    {
      // latitude: {
      //   type: String,
      //   required: true,
      // },
      // longitude: {
      //   type: String,
      //   required: true,
      // },

      address: {
        type: String,
        required: true,
      },

      street: {
        type: String,
        required: true,
      },

      barangay: {
        type: String,
        required: true,
      },

      city: {
        type: String,
        required: true,
      },
    },
  ],

  deliveryAddress: [
    {
      // latitude: {
      //   type: String,
      //   required: true,
      // },
      // longitude: {
      //   type: String,
      //   required: true,
      // },

      address: {
        type: String,
        required: true,
      },

      street: {
        type: String,
        required: true,
      },

      barangay: {
        type: String,
        required: true,
      },

      city: {
        type: String,
        required: true,
      },
    },
  ],

  paymentInfo: {
    type: String,
    required: true,
  },

  orderStatus: [
    {
      orderLevel: {
        type: String,
      },
      datedAt: {
        type: Date,
      },
    },
  ],

  orderCompletedAt: {
    type: Date,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

orderSchema
  .path("orderStatus")
  .default([{ orderLevel: "Pending", datedAt: Date.now() }]);

module.exports = mongoose.model("Order", orderSchema);
