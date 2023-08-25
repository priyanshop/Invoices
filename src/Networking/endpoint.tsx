const API_BASE_URL = '/api';

const API_TYPE = {
  USERS: 'users',
  CLIENTS: 'clients',
  ITEMS: 'items',
  SETTINGS: 'settings',
  INVOICES: 'invoices',
  ESTIMATE: 'estimates',
};

export const endpoint = {
  login: `${API_BASE_URL}/${API_TYPE.USERS}/login`,
  register: `${API_BASE_URL}/${API_TYPE.USERS}/register`,
  deleteUser: `${API_BASE_URL}/${API_TYPE.USERS}/delete-user`,
  addClient: `${API_BASE_URL}/${API_TYPE.CLIENTS}`,
  updateClient: (id: any) => `${API_BASE_URL}/${API_TYPE.CLIENTS}/${id}`,
  getClient: (id: any) => `${API_BASE_URL}/${API_TYPE.CLIENTS}/${id}`,
  getAllClient: (id: any) =>
    `${API_BASE_URL}/${API_TYPE.CLIENTS}/${id}/clientlist`,
  deleteClient: (id: any) => `${API_BASE_URL}/${API_TYPE.CLIENTS}/${id}`,
  addItems: `${API_BASE_URL}/${API_TYPE.ITEMS}`,
  updateItems: (id: any) => `${API_BASE_URL}/${API_TYPE.ITEMS}/${id}`,
  getItems: (id: any) => `${API_BASE_URL}/${API_TYPE.ITEMS}/${id}`,
  deleteItems: (id: any) => `${API_BASE_URL}/${API_TYPE.ITEMS}/${id}`,
  getAllItems: (id: any) => `${API_BASE_URL}/${API_TYPE.ITEMS}/${id}/itemlist`,
  addPaymentInfo: `${API_BASE_URL}/${API_TYPE.SETTINGS}/payment-info`,
  getPaymentInfo: `${API_BASE_URL}/${API_TYPE.SETTINGS}/payment-info`,
  defaultNotes: `${API_BASE_URL}/${API_TYPE.SETTINGS}/default-note`,
  businessInfo: `${API_BASE_URL}/${API_TYPE.SETTINGS}/business-info`,
  updateBusinessInfo: (id: any) =>
    `${API_BASE_URL}/${API_TYPE.SETTINGS}/business-info/${id}`,
  invoiceNumber: `${API_BASE_URL}/${API_TYPE.SETTINGS}/invoice-number`,
  addCustomize: `${API_BASE_URL}/${API_TYPE.SETTINGS}/customize-info`,
  getCustomize: `${API_BASE_URL}/${API_TYPE.SETTINGS}/customize-info`,
  getEmailMessage: `${API_BASE_URL}/${API_TYPE.SETTINGS}/default-email-msg`,
  addEmailMessage: `${API_BASE_URL}/${API_TYPE.SETTINGS}/default-email-msg`,

  createInvoice: `${API_BASE_URL}/${API_TYPE.INVOICES}/create`,
  getInvoiceList: `${API_BASE_URL}/${API_TYPE.INVOICES}`,
  getInvoiceDetail: (id: any) => `${API_BASE_URL}/${API_TYPE.INVOICES}/${id}`,
  updateIVBusiness: (id: any) =>
    `${API_BASE_URL}/${API_TYPE.INVOICES}/${id}/businessinfo-details`,
  updateIVPayment: (id: any) =>
    `${API_BASE_URL}/${API_TYPE.INVOICES}/${id}/paymentinfo-details`,
  updateIVNotes: (id: any) =>
    `${API_BASE_URL}/${API_TYPE.INVOICES}/${id}/notes-details`,
  updateIVClient: (id: any) =>
    `${API_BASE_URL}/${API_TYPE.INVOICES}/${id}/client-details`,
  updateIVItem: (id: any) =>
    `${API_BASE_URL}/${API_TYPE.INVOICES}/${id}/item-details`,

  createEstimate: `${API_BASE_URL}/${API_TYPE.ESTIMATE}/create`,
  getEstimateList: `${API_BASE_URL}/${API_TYPE.ESTIMATE}`,
  getEstimateDetail: (id: any) => `${API_BASE_URL}/${API_TYPE.ESTIMATE}/${id}`,
  updateETBusiness: (id: any) =>
    `${API_BASE_URL}/${API_TYPE.ESTIMATE}/${id}/businessinfo-details`,
  updateETPayment: (id: any) =>
    `${API_BASE_URL}/${API_TYPE.ESTIMATE}/${id}/paymentinfo-details`,
  updateETNotes: (id: any) =>
    `${API_BASE_URL}/${API_TYPE.ESTIMATE}/${id}/notes-details`,
  updateETClient: (id: any) =>
    `${API_BASE_URL}/${API_TYPE.ESTIMATE}/${id}/client-details`,
  updateETItem: (id: any) =>
    `${API_BASE_URL}/${API_TYPE.ESTIMATE}/${id}/item-details`,
};
