import { Strategy as GithubStrategy } from "passport-github";
import passport from "passport";
import dotenv from "dotenv";
import User from "../models/User";
import { ExpressUser } from "../interfaces/interfaces";

dotenv.config();

passport.use(
  "github",
  new GithubStrategy(
    {
      clientID: `${process.env.GITHUB_CLIENT_ID}`,
      clientSecret: `${process.env.GITHUB_CLIENT_SECRET}`,
      callbackURL: "/auth/github/callback",
    },
    async (
      accessToken: string,
      _refreshToken: string,
      profile: any,
      done: any
    ): Promise<void> => {
      // Fetching users email seperatly because github doesn't provide email
      const res = await fetch("https://api.github.com/user/emails", {
        headers: { Authorization: `token ${accessToken}` },
      });
      const emails: any[] = await res.json();

      const profileEmail = emails.filter(
        (email: any) => email.primary === true
      )[0].email;

      // Logs user in and creates user if it doesn't exist.
      const user: ExpressUser | null = await User.findOne({
        email: profileEmail,
      });
      if (user) {
        return done(null, user);
      }

      const newUser: Express.User = await User.create({
        username: profile.displayName,
        email: profileEmail,
        profilePic: profile._json.avatar_url,
        githubId: profile.id,
      });

      return done(null, newUser);
    }
  )
);

passport.serializeUser((user: any, done): void => {
  done(null, user._id);
});

passport.deserializeUser(async (id: string, done): Promise<void> => {
  const user: any = await User.findById(id);
  return done(null, user);
});
