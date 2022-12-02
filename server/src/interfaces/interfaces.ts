export interface ExpressUser extends Express.User {
  password: string;
  username: string;
  email: string;
  _id: string;
  profilePic: string;
}
