import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    media: {
      media_type: {
        type: String,
        required: true,
      },
      media_url: {
        type: String,
        required: true,
      },
    },
    ads_type: {
      type: String,
      required: true,
    },
    ads_owner_id: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    sub_category: {
      type: String,
      required: true,
    },
    ads_position: {
      type: String,
      required: true,
    },
    ads_size: {
      type: String,
      required: true,
    },
    ads_language: {
      type: String,
      required: true,
    },
    ads_location: {
      type: String,
      required: true,
    },
    keywords: {
      type: Array,
      required: true,
      default: [],
    },
    ads_url: {
      type: String,
      required: true,
    },
    is_active: {
      type: Boolean,
      required: true,
    },
    impressions: {
      type: Number,
      required: true,
    },
    clicks: {
      type: Number,
      required: true,
    },
    ctr: {
      type: Number,
      required: true,
    },
    cost: {
      type: Number,
      required: true,
    },
    cost_type: {
      type: String,
      required: true,
    },
    cost_per_click: {
      type: Number,
      required: true,
    },
    cost_per_impression: {
      type: Number,
      required: true,
    },
    is_approved: {
      type: Boolean,
      required: true,
    },
    last_impression: {
      type: Date,
      required: true,
    },
    last_click: {
      type: Date,
      required: true,
    },
    activity_history: {
      type: Array,
      required: true,
      default: [
        {
          activity_type: {
            type: String,
            required: true,
          },
          activity_date: {
            type: Date,
            required: true,
          },
          activity_site: {
            type: String,
            required: true,
          },
          activity_ip: {
            type: String,
            required: true,
          },
        },
      ],
    },
  },
  { timestamps: true }
);

const Banner = mongoose.model("Banner", bannerSchema);

export default Banner;
