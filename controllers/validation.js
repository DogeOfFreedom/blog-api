const { validationResult } = require("express-validator");

const checkForErrors = (req, res, next) => {
  const errorsObj = validationResult(req);

  if (!errorsObj.isEmpty()) {
    const firstErrorMsg = errorsObj.errors[0].msg;
    res.json({ error: firstErrorMsg });
  }
  next();
};

module.exports = { checkForErrors };
