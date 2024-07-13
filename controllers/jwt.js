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
  const { _id } = req.user.toJSON();
  jwt.sign(
    { _id },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "3600s" },
    (err, token) => {
      if (err) {
        return res.sendStatus(500);
      }
      res.cookie("jwt", `Bearer ${token}`, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60,
        sameSite: "None",
        secure: true,
        partitioned: true,
      });
      return res.sendStatus(200);
    }
  );
};

const invalidateToken = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    maxAge: 1,
    sameSite: "None",
    secure: true,
    partitioned: true,
  });
  res.sendStatus(200);
};

const verifyToken = (req, res, next) => {
  const bearerHeader = req.cookies.jwt;

  if (typeof bearerHeader !== "undefined") {
    const bearerToken = bearerHeader.split(" ")[1];

    // verify the token
    jwt.verify(bearerToken, process.env.JWT_SECRET_KEY, (err, data) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = data;
      return next();
    });
  } else {
    res.sendStatus(403);
  }
};

module.exports = { auth, createToken, verifyToken, invalidateToken };
