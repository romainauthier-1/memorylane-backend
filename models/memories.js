const mongoose = require("mongoose");

const memorySchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    title: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: false,
    },
    type: {
      type: String,
      enum: ["moment", "period"],
      default: "moment",
    },
    thumbnail: {
      type: String,
      default: "",
    },
    position: {
      x: Number,
      y: Number,
    },
    medias: [
      {
        type: {
          type: String,
          enum: ["image", "video", "audio", "text"],
        },
        url: String,
        caption: String,
      },
    ],
    colors: [String],
    description: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

const Memory = mongoose.model("memories", memorySchema);

module.exports = Memory;
