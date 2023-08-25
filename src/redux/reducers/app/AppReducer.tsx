import { createSlice } from "@reduxjs/toolkit";
import { patientType } from "../../../Utils/types";

interface IUserState {
  isLoding: boolean;
  selectedPatient: patientType[] | [];
  selectedMember: patientType[] | [];
  selectedCareTaker: patientType[] | [];
}
// user redusre store user data and all types of token
const initialState: IUserState = {
  isLoding: false,
  selectedPatient: [],
  selectedMember: [],
  selectedCareTaker: [],



};

const AppReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoder: (state, action) => {
      state.isLoding = action.payload;
    },
    setPatient: (state, action) => {
      state.selectedPatient = action.payload;
    },
    setMember: (state, action) => {
      state.selectedMember = action.payload;
    },
    setCareTaker: (state, action) => {
      state.selectedCareTaker = action.payload;
    },
  },
});

export const { setLoder, setPatient, setMember, setCareTaker } =
  AppReducer.actions;

export default AppReducer.reducer;
