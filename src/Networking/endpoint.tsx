const API_BASE_URL = '/api';

const API_TYPE = {
  USERS: 'users',
  CLIENTS: 'clients',
  ITEMS: 'items',
  SETTINGS: 'settings',
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
};
