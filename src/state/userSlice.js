import { createSlice } from "@reduxjs/toolkit";
import { gsap } from "gsap";

const initialState = {
  address: "",
  nfts: [],
  activePlane: null,
  history: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    setNfts: (state, action) => {
      state.nfts = action.payload;
    },
    setActivePlane: (state, action) => {
      if (state.activePlane) {
        gsap.to(state.activePlane.position, {
          duration: 1,
          x: state.activePlane.initPos[0],
          y: state.activePlane.initPos[1],
          z: state.activePlane.initPos[2],
        });
      }
      state.activePlane = action.payload;
      if (action.payload) {
        gsap.to(action.payload.position, { duration: 1, x: 0, y: 0, z: 3.5 });
      }
    },
    addToHistory: (state, action) => {
      state.history.unshift(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAddress, setNfts, setActivePlane, addToHistory } =
  userSlice.actions;

export default userSlice.reducer;
