import {
  Strategy as GoogleStrategy,
  VerifyCallback,
} from "passport-google-oauth20";
import passport from "passport";
import dotenv from "dotenv";
import User from "../models/User";
import { ExpressUser } from "../interfaces/interfaces";

dotenv.config();

export let redirectToStep2: boolean = false;

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: `${process.env.GOOGLE_CLIENT_ID}`,
      clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    // prettier-ignore
    async ( _accessToken: string, _refreshToken: string, profile: any, done: VerifyCallback ): Promise<void> => {
      // Logs user in and creates user if it doesn't exist.
      const user: ExpressUser | null = await User.findOne({
        email: profile.emails[0].value,
      });
      if (user) {
        return done(null, user);
      }

      redirectToStep2 = true;

      const newUser: Express.User = await User.create({
        username: profile.displayName,
        email: profile.emails[0].value,
        profilePic: profile.photos[0].value,
        googleId: profile.id,
      });

      return done(null, newUser);
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
