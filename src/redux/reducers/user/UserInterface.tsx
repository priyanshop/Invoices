// import { MessageType } from "../../../screens/TestScreen/types";

export interface ILoginRequestData {
  accessToken: string;
  expiresIn: number;
  idToken: string;
  refreshToken: string;
  tokenType: string;
}

export interface IChats {
  groupInfo: any;
  chats: any[];
}

export interface IUserState {
  userData: any | null;
  token: any | null;
  clientList: any | null;
  itemsList: any | null;
  businessDetails: any | null;
  paymentInfo: any | null;
  defaultNotes: any | null;
  defaultInvoiceFormat: any | null;
  language: string;
  defaultEmailMessage: string;
  customizeLabels: any | null;
  sendToEmail: any | null;
  globalDateFormat: any | null;
  invoiceList: any;
  // localChats: IChats[] | [];
  // localChatsPub: IChats2[] | [];
}
// export interface IChats2 {
//   groupInfo: any;
//   chats: MessageType[];
// }
