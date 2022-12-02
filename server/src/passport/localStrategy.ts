import { Strategy as LocalStrategy } from "passport-local";
import passport from "passport";
import User from "../models/User";
import { compare } from "bcrypt";
import { ExpressUser } from "../interfaces/interfaces";

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (_req, email: string, password: string, done): Promise<void> => {
      // Making sure email is correct
      const user: ExpressUser | null = await User.findOne({ email });
      if (!user) return done("Invalid email or password");

      // Making sure the password is correct
      const validPass: boolean = await compare(password, user.password);
      if (!validPass) return done("Invalid email or password");

      return done(null, user);
    }
  )
);

passport.serializeUser((user: any, done): void => {
  return done(null, user._id);
});

passport.deserializeUser(async (id: string, done): Promise<void> => {
  const user = await User.findById(id);
  done(null, user);
});
