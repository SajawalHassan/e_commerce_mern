import { Strategy as LocalStrategy } from "passport-local";
import passport from "passport";
import User from "../models/User";
import { compare } from "bcrypt";

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (_req, email: string, password: string, done) => {
      // Making sure email is correct
      const user = await User.findOne({ email });
      if (!user) return done("Invalid email or password");

      // Making sure the password is correct
      const validPass = await compare(password, user.password);
      if (!validPass) return done("Invalid email or password");

      return done(null, user);
    }
  )
);

passport.serializeUser((user: any, done) => {
  return done(null, user._id);
});

passport.deserializeUser((user: object, done) => {
  return done(null, user);
});
