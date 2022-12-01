export const clientURL: string =
  process.env.NODE_ENV === "production"
    ? "https://e-commerce-1f12.vercel.app"
    : "http://localhost:5173";
