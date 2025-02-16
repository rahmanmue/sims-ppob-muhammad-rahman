import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import TransactionService from "@/services/TransactionService";
import ProfileService from "@/services/ProfileService";

export const fetchBalance = createAsyncThunk("profile/fetchBalance", async () => {
  const res = await TransactionService.GetBalance();
  const resJson = await res.json();
  return resJson.data.balance;
});

export const fetchProfile = createAsyncThunk("profile/fetchProfile", async () => {
  const res = await ProfileService.GetProfile();
  const resJson = await res.json();
  return resJson.data;
});

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    balance: "",
    fullName: "",
    profileImage: "",
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBalance.fulfilled, (state, action) => {
        state.balance = action.payload;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        const { first_name, last_name, profile_image } = action.payload;
        state.fullName = `${first_name} ${last_name}`;
        state.profileImage = profile_image;
      });
  },
});

export default profileSlice.reducer;
