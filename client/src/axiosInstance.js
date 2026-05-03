import axios from "axios";

// ─── Axios instance shared across the entire frontend ─────────────────────────
// WHY baseURL: centralises the API URL so changing the backend domain requires
// editing one file, not hunting through every component.
const axiosInstance = axios.create({
  baseURL: "https://api.genwebai.online", // NO trailing slash

  // WHY withCredentials: true:
  // The backend sets the JWT in an httpOnly cookie.
  // Without this flag the browser strips the cookie from every request,
  // so isAuth middleware always sees an empty req.cookies.token → 401.
  // This must be set on EVERY request, not just the login call.
  withCredentials: true,
});

export default axiosInstance;
