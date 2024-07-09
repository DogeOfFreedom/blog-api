const passport = require("passport");
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  // Authenticate the user
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.sendStatus(500);
    }
    if (!user) {
      return res.sendStatus(401);
    }
    req.user = user;
    next();
  })(req, res, next);
};

const createToken = (req, res) => {
  const user = req.user.toJSON();
  jwt.sign(
    user,
    process.env.JWT_SECRET_KEY,
    { expiresIn: "3600s" },
    (err, token) => {
      if (err) {
        return res.sendStatus(500);
      }
      return res.json({ token });
    }
  );
};

const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers.authorization;

  if (typeof bearerHeader !== "undefined") {
    const bearerToken = bearerHeader.split(" ")[1];

    // verify the token
    jwt.verify(bearerToken, process.env.JWT_SECRET_KEY, (err, data) => {
      if (err) {
        return res.sendStatus(403);
      }
      return next();
    });
  } else {
    res.sendStatus(403);
  }
};

module.exports = { auth, createToken, verifyToken };
