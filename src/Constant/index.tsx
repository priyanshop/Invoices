const importedInvoice: any = {
  status: 'success',
  message: 'Invoice data',
  data: {
    _id: '64bfa697cfd6ecfd2fc76d09',
    user: '64b4de67066c5dd236d85817',
    invoice_number: 'INV001s4',
    invoice_date: '2023-07-24T18:30:00.000Z',
    b_id: '64b52408066c5dd236d85abe',
    b_name: 'My business',
    b_email: 'Tereff@gmail.com',
    b_address1: 'Fdsgsdf',
    b_address2: 'Gfsdgsd',
    b_address3: 'Dfsgsdfg',
    b_business_logo: 'logo.png ',
    c_address1: '',
    c_address2: 'GA',
    c_address3: '3494 Kuhl Avenue',
    is_invoice_tax_inclusive: false,
    paypal_email: 'Trtrtr.@hm.dvv',
    make_checks_payable: 'Jjjj',
    payment_instructions: 'Prius should',
    additional_payment_instructions: 'Gsdfgsdfg',
    notes: 'Gfgdgdf',
    is_paid: false,
    items: [
      {
        description: 'testing',
        unit: '123',
        rate: 10,
        discount_rate: 10,
        discount_type: 'Percentage',
        discount_value: 10,
        discount_amount: 10,
        total: 100,
        discount_total: 10,
        is_taxable: true,
        item_notes: 'for testing',
        _id: '64bfcfc2f9a4c1b1f6339fa9',
      },
      {
        description: 'testing 222',
        unit: '123',
        rate: 10,
        discount_rate: 10,
        discount_type: 'none',
        discount_value: 10,
        discount_amount: 10,
        total: 100,
        discount_total: 10,
        is_taxable: true,
        item_notes: 'for testing',
        _id: '64bfcfc2f9a4c1b1f6339faa',
      },
    ],
    photos: [],
    payments: [],
    createdAt: '2023-07-25T10:40:23.284Z',
    updatedAt: '2023-07-25T13:36:02.810Z',
    __v: 0,
    b_business_number: 423423423,
    b_mobile_number: '464654645',
    b_owner_name: '8868768',
    b_phone_number: '45546546546',
    b_website: 'Dsfsdf',
    c_contact: '',
    c_email: 'John-Appleseed@mac.com',
    c_fax: '',
    c_mobile_number: '888-555-5512',
    c_name: 'John Appleseed',
    c_phone_number: '548878787878',
    invoice_discount_amount: 120,
    invoice_discount_type: 'zero',
    invoice_discount_value: 100,
    invoice_tax_label: 'aaaa',
    invoice_tax_rate: 10,
    invoice_tax_type: 'zero',
    invoice_total: 50,
    invoice_total_tax_amount: 20,
  },
};

function extractInvoiceNumbers(data: any) {
  const regex = /INV(\d+)/g;
  const invoiceNumbers: any = [];

  // Flatten the nested structure (it seems there are extra square brackets)
  data = data.flat(Infinity);

  data.forEach((item: any) => {
    const itemStr = JSON.stringify(item);
    let match;

    while ((match = regex.exec(itemStr)) !== null) {
      invoiceNumbers.push(match[1]);
    }
  });

  return invoiceNumbers;
}

function extractETNumbers(data: any) {
  const regex = /EST(\d+)/g;
  const invoiceNumbers: any = [];

  // Flatten the nested structure (it seems there are extra square brackets)
  data = data.flat(Infinity);

  data.forEach((item: any) => {
    const itemStr = JSON.stringify(item);
    let match;

    while ((match = regex.exec(itemStr)) !== null) {
      invoiceNumbers.push(match[1]);
    }
  });

  return invoiceNumbers;
}

export const setNewInvoiceInList = (selector: any) => {
  const temp = {
    _id: '',
    user: '',
    invoice_number: 'INV'.concat(
      selector.invoiceList.length > 0
        ? (
            parseInt(
              extractInvoiceNumbers(selector.invoiceList)[
                extractInvoiceNumbers(selector.invoiceList).length - 1
              ],
            ) + 1
          ).toString()
        : '1',
    ),
    invoice_date: new Date(),
    b_id: '',
    b_name: selector.businessDetails.name,
    b_email: selector.businessDetails.email,
    b_address1: selector.businessDetails.address1,
    b_address2: selector.businessDetails.address2,
    b_address3: selector.businessDetails.address3,
    b_business_logo: selector.businessDetails.business_logo,
    is_invoice_tax_inclusive: false,
    paypal_email: selector.paymentInfo.paypal_email,
    make_checks_payable: selector.paymentInfo.make_checks_payable,
    payment_instructions: selector.paymentInfo.payment_instructions,
    additional_payment_instructions:
      selector.paymentInfo.additional_payment_instructions,
    notes: selector.defaultNotes.invoices,
    is_paid: false,
    items: [],
    photos: [],
    payments: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    __v: 0,
    b_business_number: selector.businessDetails.business_number,
    b_mobile_number: selector.businessDetails.mobile_number,
    b_owner_name: selector.businessDetails.owner_name,
    b_phone_number: selector.businessDetails.phone_number,
    b_website: selector.businessDetails.website,
    index: new Date().getTime(),
    due_amount: 0,
    paid_amount: 0,
    background_color: '#CCC',
    template_no: 1,
  };
  return temp;
};

export const setNewEstimateInList = (selector: any) => {
  const temp = {
    _id: '',
    user: '',
    invoice_date: new Date(),
    b_id: '',
    b_name: selector.businessDetails.name,
    b_email: selector.businessDetails.email,
    b_address1: selector.businessDetails.address1,
    b_address2: selector.businessDetails.address2,
    b_address3: selector.businessDetails.address3,
    b_business_logo: selector.businessDetails.business_logo,
    notes: selector.defaultNotes.invoices,
    is_paid: false,
    items: [],
    photos: [],
    payments: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    __v: 0,
    b_business_number: selector.businessDetails.business_number,
    b_mobile_number: selector.businessDetails.mobile_number,
    b_owner_name: selector.businessDetails.owner_name,
    b_phone_number: selector.businessDetails.phone_number,
    b_website: selector.businessDetails.website,
    index: new Date().getTime(),
    estimate_number: 'EST'.concat(
      selector.estimateList.length > 0
        ? (
            parseInt(
              extractETNumbers(selector.estimateList)[
                extractETNumbers(selector.estimateList).length - 1
              ],
            ) + 1
          ).toString()
        : '1',
    ),
    is_estimate_tax_inclusive: true,
    status: 'open',
    due_amount: 0,
    paid_amount: 0,
    background_color: '#CCC',
    template_no: 1,
  };
  return temp;
};

export const offlineLimit = 4;


export const API_KEY = "";