const mongoose = require("mongoose");

const storeMachineCleaningSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  storebranch: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "StoreBranch",
  },
  checklist: {
    cleanTank: {
      type:Boolean,
      default: false
    },
    cleanPipeline: {
      type:Boolean,
      default: false
    },
    cleanSedimentFilters: {
      type:Boolean,
      default: false
    },
    cleanBrineTank: {
      type:Boolean,
      default: false
    },
    replaceTank: {
      type:Boolean,
      default: false
    },
    replaceBoosterPump: {
      type:Boolean,
      default: false
    },
    replacePipelines: {
      type:Boolean,
      default: false
    },
    replaceSedimentFilter: {
      type:Boolean,
      default: false
    },
  },
  dateIssued: {
    type: Date,
    required: true,
  },
  expiryDate: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("MachineCleaning", storeMachineCleaningSchema);
