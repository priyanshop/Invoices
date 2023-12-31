import { createSlice } from '@reduxjs/toolkit';
import { IUserState } from './UserInterface';

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
    business_number: '',
    website: '',
    owner_name: '',
    mobile_number: '',
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
  defaultInvoiceFormat: {
    invoice_number_prefix: '',
    estimate_number_prefix: '',
  },
  language: 'en',
  defaultEmailMessage: '',
  customizeLabels: {
    invoice_title: '',
    estimate_title: '',
    business_number: '',
    quantity_label: '',
    rate_label: '',
    quantityAndUnitCost: true,
  },
  sendToEmail: false,
  globalDateFormat: 'yyyy-MM-DD',
  invoiceList: [],
  estimateList: [],
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
      state.clientList = [];
      state.itemsList = [];
      state.businessDetails = {
        name: '',
        email: '',
        phone_number: '',
        address1: '',
        address2: '',
        address3: '',
        business_logo: '',
        business_number: '',
        website: '',
        owner_name: '',
        mobile_number: '',
      },
        state.customizeLabels = {
          invoice_title: '',
          estimate_title: '',
          business_number: '',
          quantity_label: '',
          rate_label: '',
          quantityAndUnitCost: true,
        },
        state.paymentInfo = {
          paypal_email: '',
          make_checks_payable: '',
          payment_instructions: '',
          additional_payment_instructions: '',
        },
        state.defaultNotes = {
          invoices: '',
          estimates: '',
        },
        state.defaultInvoiceFormat = {
          invoice_number_prefix: '',
          estimate_number_prefix: '',
        },
        state.globalDateFormat = 'yyyy-MM-DD',
        state.invoiceList = [],
        state.estimateList = [],
        state.defaultEmailMessage = ""
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
    changeLanguage: (state, action) => {
      state.language = action.payload;
    },
    changeDefaultEmailMsg: (state, action) => {
      state.defaultEmailMessage = action.payload;
    },
    changeCustomize: (state, action) => {
      state.customizeLabels = action.payload;
    },
    changeSendToEmail: (state, action) => {
      state.sendToEmail = action.payload;
    },
    changeGlobalDateFormat: (state, action) => {
      state.globalDateFormat = action.payload;
    },

    addNewInvoice: (state, action) => {
      state.invoiceList = [...state.invoiceList, action.payload];
    },

    setInvoiceList: (state, action) => {
      state.invoiceList = action.payload;
    },

    addNewEstimate: (state, action) => {
      state.estimateList = [...state.estimateList, action.payload];
    },

    setEstimateList: (state, action) => {
      state.estimateList = action.payload;
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
  setDefaultInvoiceFormat,
  changeLanguage,
  changeDefaultEmailMsg,
  changeCustomize,
  changeSendToEmail,
  changeGlobalDateFormat,
  addNewInvoice,
  setInvoiceList,
  addNewEstimate,
  setEstimateList,
  // setChat,
  // setPubChat,
  // removePubChat,
} = UserReducer.actions;

export default UserReducer.reducer;
