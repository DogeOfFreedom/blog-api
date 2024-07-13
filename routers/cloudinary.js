const { generateSignature } = require("../controllers/signedUpload");

const router = require("express").Router();

router.get("/signed_upload", generateSignature);

module.exports = router;
