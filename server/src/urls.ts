export const origin: string =
  process.env.NODE_ENV === "production"
    ? "https://e-commerce-1f12.vercel.app"
    : "http://localhost:3000";
