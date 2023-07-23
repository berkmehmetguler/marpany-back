import Campaign from "../../models/campaigns/index.js";
import Banner from "../../models/ads_types/banner.js";
const createCampaign = async (req, res, next) => {
  try {
    const { name, ads_type, ads_owner_id } = req.body;

    const campaignNameIsExist = await Campaign.findOne({
      name,
    });

    if (campaignNameIsExist) {
      return res.status(400).json({
        message: "Campaign name is exist",
      });
    }

    let USE_ADS_ID;

    if (ads_type === "banner") {
      const banner = await Banner.create({
        ads_owner_id,
      });

      USE_ADS_ID = banner._id;
    }

    await Campaign.create({
      name,
      campaign_owner_id: ads_owner_id,
      all_ads: {
        ads_id: USE_ADS_ID,
        ads_type,
        ads_owner_id,
        ads_name: ads_type.charAt(0).toUpperCase() + ads_type.slice(1),
      },
    });
    return res.status(201).json({
      ads_id: USE_ADS_ID,
      ads_type,
    });
  } catch (error) {
    next(error);
  }
};

export { createCampaign };
