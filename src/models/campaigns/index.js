import mongoose from "mongoose";

const campaignSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  campaign_owner_id: {
    type: String,
    required: true,
  },
  all_ads: [
    {
      ads_name: {
        type: String,
        required: true,
      },
      ads_id: {
        type: String,
        required: true,
      },
      ads_type: {
        type: String,
        required: true,
      },
      ads_owner_id: {
        type: String,
        required: true,
      },
    },
  ],
});

const Campaign = mongoose.model("Campaign", campaignSchema);

export default Campaign;
