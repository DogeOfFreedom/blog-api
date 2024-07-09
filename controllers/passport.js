const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

const fakeUser = {
  username: "johnny",
  password: "1234",
};

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      //   const user = await User.findOne({ username });

      let user = null;
      if (username === fakeUser.username) {
        user = fakeUser;
      }

      if (!user) {
        return done(null, false);
      }
      //   const match = await bcrypt(password, user.password);
      const match = password === fakeUser.password;
      if (!match) {
        return done(null, false);
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user);
});
