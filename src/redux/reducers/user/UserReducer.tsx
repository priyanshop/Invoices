import {createSlice} from '@reduxjs/toolkit';
import {IUserState} from './UserInterface';

// user redusre store user data and all types of token
const initialState: IUserState = {
  userData: null,
  token: null,
  clientList: [],
  itemsList: [],
  businessDetails: {
    name: '',
    email: '',
    phone_number: '',
    address1: '',
    address2: '',
    address3: '',
    business_logo: '',
  },
  paymentInfo: {
    paypal_email: '',
    make_checks_payable: '',
    payment_instructions: '',
    additional_payment_instructions: '',
  },
  defaultNotes: {
    invoices: '',
    estimates: '',
  },
  defaultInvoiceFormat:{
    invoice_number_prefix: '',
    estimate_number_prefix: '',
  }
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
    setClientList: (state, action) => {
      state.clientList = action.payload;
    },
    addItemInList: (state, action) => {
      state.itemsList = [...state.itemsList, action.payload];
    },
    setItemList: (state, action) => {
      state.itemsList = action.payload;
    },
    setBusinessDetail: (state, action) => {
      state.businessDetails = action.payload;
    },
    setPaymentInfo: (state, action) => {
      state.paymentInfo = action.payload;
    },
    setDefaultNotes: (state, action) => {
      state.defaultNotes = action.payload;
    },
    setDefaultInvoiceFormat: (state, action) => {
      state.defaultInvoiceFormat = action.payload;
    },
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
  setClientList,
  addItemInList,
  setItemList,
  setBusinessDetail,
  setPaymentInfo,
  setDefaultNotes,
  setDefaultInvoiceFormat
  // setChat,
  // setPubChat,
  // removePubChat,
} = UserReducer.actions;

export default UserReducer.reducer;
