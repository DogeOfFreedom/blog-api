const cloudinary = require("cloudinary").v2;

const generateSignature = (req, res) => {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp,
    },
    process.env.CLOUD_API_SECRET
  );
  return res.json({
    timestamp,
    signature,
    cloudname: process.env.CLOUD_NAME,
    apikey: process.env.CLOUD_API_KEY,
  });
};

module.exports = { generateSignature };
