import {
  Strategy as GoogleStrategy,
  VerifyCallback,
} from "passport-google-oauth20";
import passport from "passport";
import dotenv from "dotenv";
import User from "../models/User";
import { ExpressUser } from "../interfaces/interfaces";

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: `${process.env.CLIENT_ID}`,
      clientSecret: `${process.env.CLIENT_SECRET}`,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    async (
      _accessToken: string,
      _refreshToken: string,
      profile: any,
      done: VerifyCallback
    ): Promise<void> => {
      const user: ExpressUser | null = await User.findById(profile._id);
      if (user) {
        return done(null, user);
      } else {
        const newUser: Express.User = await User.create({
          username: profile.displayName,
          email: profile.emails[0].value,
          profilePic: profile.photos[0].value,
        });

        return done(null, newUser);
      }
    }
  )
);

passport.serializeUser((user: any, done: VerifyCallback): void => {
  done(null, user._id);
});

passport.deserializeUser(
  async (id: string, done: VerifyCallback): Promise<void> => {
    const user: any = await User.findById(id);
    return done(null, user);
  }
);
