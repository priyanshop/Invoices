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
  deleteUser: `${API_BASE_URL}/${API_TYPE.USERS}/delete/user`,
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
  deleteBusinessImage: (id: any) =>
    `${API_BASE_URL}/${API_TYPE.SETTINGS}/business-info/${id}/delete/logo`,

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
  duplicateInvoice: (id: any) =>
    `${API_BASE_URL}/${API_TYPE.INVOICES}/${id}/duplicate`,
  deleteInvoice: (id: any) => `${API_BASE_URL}/${API_TYPE.INVOICES}/${id}`,
  markPaidInvoice: (id: any) =>
    `${API_BASE_URL}/${API_TYPE.INVOICES}/${id}/marked`,
  addSignatureIN: (id: any) =>
    `${API_BASE_URL}/${API_TYPE.INVOICES}/${id}/signature`,
  addPhotoIN: (id: any) => `${API_BASE_URL}/${API_TYPE.INVOICES}/${id}/photo`,
  deletePhotoIN: (id: any, id2: any) =>
    `${API_BASE_URL}/${API_TYPE.INVOICES}/${id}/photo/${id2}/delete/photo`,
  updatePhotoIN: (id: any, id2: any) =>
    `${API_BASE_URL}/${API_TYPE.INVOICES}/${id}/photo/${id2}/update/photo`,
  updateReviewIN: (id: any) =>
    `${API_BASE_URL}/${API_TYPE.INVOICES}/${id}/review/link`,
  updateIVNumber: (id: any) =>
    `${API_BASE_URL}/${API_TYPE.INVOICES}/${id}/edit/invoice/number`,

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
  duplicateET: (id: any) =>
    `${API_BASE_URL}/${API_TYPE.ESTIMATE}/${id}/duplicate`,
  deleteET: (id: any) => `${API_BASE_URL}/${API_TYPE.ESTIMATE}/${id}`,
  makeInvoiceET: (id: any) =>
    `${API_BASE_URL}/${API_TYPE.ESTIMATE}/${id}/make/invoice`,
  addSignatureET: (id: any) =>
    `${API_BASE_URL}/${API_TYPE.ESTIMATE}/${id}/signature`,
  addPhotoET: (id: any) => `${API_BASE_URL}/${API_TYPE.ESTIMATE}/${id}/photo`,
  updatePhotoET: (id: any, id2: any) =>
    `${API_BASE_URL}/${API_TYPE.ESTIMATE}/${id}/photo/${id2}/update/photo`,

  updateETNumber: (id: any) =>
    `${API_BASE_URL}/${API_TYPE.ESTIMATE}/${id}/edit/estimate/number`,
  deletePhotoET: (id: any, id2: any) =>
    `${API_BASE_URL}/${API_TYPE.ESTIMATE}/${id}/photo/${id2}/delete/photo`,
  updateReviewET: (id: any) =>
    `${API_BASE_URL}/${API_TYPE.ESTIMATE}/${id}/review/link`,
  exportSpreadSheet: `${API_BASE_URL}/${API_TYPE.INVOICES}/export/excel`,
};
