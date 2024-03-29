const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  customer: {
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
      type: {
        type: String,
        required: true,
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

  orderProducts: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        // required: true,
        ref: "Product",
      },
      type: {
        type: mongoose.Schema.Types.ObjectId,
        // required: true,
        ref: "TypeOfGallon",
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

  selectedStore: {
    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "StoreBranch",
    },
    branchNo: {
      type: String,
    },

    address: {
      type: String,
    },
    deliveryFee: {
      type: Number,
      // required: true,
      default: 0,
    },
  },

  deliveryAddress: {
    houseNo: {
      type: String,
    },

    streetName: {
      type: String,
    },

    purokNum: {
      type: String,
    },

    barangay: {
      type: String,
    },

    city: {
      type: String,
    },
  },

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
      staff: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],

  totalPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },

  // notes: {
  //   type: String,
  //   default: "",
  // },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

orderSchema
  .path("orderStatus")
  .default([{ orderLevel: "Order Placed", datedAt: Date.now() }]);

module.exports = mongoose.model("Order", orderSchema);
