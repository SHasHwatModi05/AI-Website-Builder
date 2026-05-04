import { createSlice } from "@reduxjs/toolkit";

// Seed initial state from localStorage — instant hydration, no flicker
const storedUser = (() => {
  try { return JSON.parse(localStorage.getItem("genweb_user")); }
  catch { return null; }
})();

const userSlice = createSlice({
  name: "user",
  initialState: { userData: storedUser },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
      // Keep localStorage in sync (null = logout → clear)
      if (action.payload) {
        localStorage.setItem("genweb_user", JSON.stringify(action.payload));
      } else {
        localStorage.removeItem("genweb_user");
      }
    }
  }
});

export const { setUserData } = userSlice.actions;
export default userSlice.reducer;