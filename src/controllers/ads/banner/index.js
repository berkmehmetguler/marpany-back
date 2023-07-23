import Banner from "../../../models/ads_types/banner.js";

const getForDashboard = async (req, res, next) => {
  try {
    const { ads_id, user_id } = req.params;
    const banners = await Banner.findOne({
      _id: ads_id,
      ads_owner_id: user_id,
    });
    return res.status(200).json(banners);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export { getForDashboard };
