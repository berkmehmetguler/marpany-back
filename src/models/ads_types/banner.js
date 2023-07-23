import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: false,
      default: "",
    },
    description: {
      type: String,
      required: false,
      default: "",
    },
    media: {
      media_type: {
        type: String,
        required: false,
        default: "",
      },
      media_url: {
        type: String,
        required: false,
        default: "",
      },
    },
    ads_type: {
      type: String,
      required: false,
      default: "banner",
    },
    ads_owner_id: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: false,
      default: "",
    },
    sub_category: {
      type: String,
      required: false,
      default: "",
    },
    ads_position: {
      type: String,
      required: false,
      default: "",
    },
    ads_size: {
      type: String,
      required: false,
      default: "",
    },
    ads_language: {
      type: String,
      required: false,
      default: "",
    },
    ads_location: {
      type: String,
      required: false,
      default: "",
    },
    keywords: {
      type: Array,
      required: false,
      default: [],
    },
    ads_url: {
      type: String,
      required: false,
      default: "",
    },
    is_active: {
      type: Boolean,
      required: false,
      default: false,
    },
    impressions: {
      type: Number,
      required: false,
      default: 0,
    },
    clicks: {
      type: Number,
      required: false,
      default: 0,
    },
    ctr: {
      type: Number,
      required: false,
      default: 0,
    },
    cost: {
      type: Number,
      required: false,
    },
    cost_type: {
      type: String,
      required: false,
      default: 0.0,
    },
    cost_per_click: {
      type: Number,
      required: false,
      default: 0.0,
    },
    cost_per_impression: {
      type: Number,
      required: false,
      default: 0.0,
    },
    is_approved: {
      type: Boolean,
      required: false,
      default: false,
    },
    last_impression: {
      type: Date,
      required: false,
    },
    last_click: {
      type: Date,
      required: false,
    },
    activity_history: {
      type: Array,
      required: false,
      default: [
        {
          activity_type: {
            type: String,
            required: false,
          },
          activity_date: {
            type: Date,
            required: false,
          },
          activity_site: {
            type: String,
            required: false,
          },
          activity_ip: {
            type: String,
            required: false,
          },
        },
      ],
    },
  },
  { timestamps: false }
);

const Banner = mongoose.model("Banner", bannerSchema);

export default Banner;
