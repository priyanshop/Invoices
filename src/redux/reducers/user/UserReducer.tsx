import {createSlice} from '@reduxjs/toolkit';
import {IUserState} from './UserInterface';

// user redusre store user data and all types of token
const initialState: IUserState = {
  userData: null,
  token: null,
  clientList: [],
  // localChats: [],
  // localChatsPub: [],
};

const UserReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveUserData: (state, action) => {
      state.userData = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    removeUserData: state => {
      state.userData = null;
      state.token = null;
    },
    addClientInList: (state, action) => {
      state.clientList = [...state.clientList, action.payload];
    },
    setClientList:(state, action)=>{
      state.clientList =  action.payload;
    }
    // setChat: (state, action) => {
    //   state.localChats = action.payload;
    // },
    // setPubChat: (state, action) => {
    //   state.localChatsPub = action.payload;
    // },
    // removePubChat: (state) => {
    //   state.localChatsPub = [];
    // },
  },
});

export const {
  saveUserData,
  removeUserData,
  setToken,
  addClientInList,
  setClientList
  // setChat,
  // setPubChat,
  // removePubChat,
} = UserReducer.actions;

export default UserReducer.reducer;
