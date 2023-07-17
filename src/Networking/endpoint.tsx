export const endpoint = {
  login: '/api/users/login',
  register: '/api/users/register',
  deleteUser: '/api/users/delete-user',
  addClient: '/api/clients',
  updateClient: (id: any) => '/api/clients/' + id,
  getClient: (id: any) => '/api/clients/' + id,
  getAllClient: (id: any) => '/api/clients/' + id + '/clientlist',
  deleteClient: (id: any) => '/api/clients/' + id,
  addItems: '/api/items',
  updateItems: (id: any) => '/api/items/' + id,
  getItems: (id: any) => '/api/items/' + id,
  deleteItems: (id: any) => '/api/items/' + id,
  getAllItems: (id: any) => '/api/items/' + id + '/itemlist',
  addPaymentInfo: '/api/settings/payment-info',
  getPaymentInfo: '/api/settings/payment-info',
};
