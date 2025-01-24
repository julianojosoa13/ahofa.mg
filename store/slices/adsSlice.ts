import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../store";

const adsSlice = createSlice({
  name: "ads",
  initialState: {
    bannerAdsCount: 0,
    interstitialAdsCount: 0,
    rewardedAdsCount: 0,
  },
  reducers: {
    incrementBannerAd(state) {
      state.bannerAdsCount += 1;
    },
    incrementInterstitialAd(state) {
      state.interstitialAdsCount += 1;
    },
    incrementRewardedAd(state) {
      state.rewardedAdsCount += 1;
    },
  },
});

export const {
  incrementBannerAd,
  incrementInterstitialAd,
  incrementRewardedAd,
} = adsSlice.actions;

export default adsSlice.reducer;
