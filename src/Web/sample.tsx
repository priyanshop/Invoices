import moment from "moment";

export const SampleTemplate = (globalData: any,business_logo:any) => {
  const script = `<!DOCTYPE html>
  <html lang="en">
  
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>invoice</title>
  </head>
  
  <body>
      <style>
          .top_rw {
              background-color: ${globalData||"#ccc"};
          }
  
          .td_w {}
  
          button {
              padding: 5px 10px;
              font-size: 14px;
          }
  
          .invoice-box {
              max-width: 890px;
              margin: auto;
              padding: 10px;
              border: 1px solid #eee;
              box-shadow: 0 0 10px rgba(0, 0, 0, .15);
              font-size: 14px;
              line-height: 24px;
              font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
              color: #555;
          }
  
          .invoice-box table {
              width: 100%;
              line-height: inherit;
              text-align: left;
              border-bottom: solid 1px #ccc;
          }
  
          .invoice-box table td {
              padding: 5px;
              vertical-align: middle;
          }
  
          .invoice-box table tr td:nth-child(2) {
              text-align: right;
          }
  
          .invoice-box table tr.top table td {
              padding-bottom: 20px;
          }
  
          .invoice-box table tr.top table td.title {
              font-size: 45px;
              line-height: 45px;
              color: #333;
          }
  
          .invoice-box table tr.information table td {
              /* padding-bottom: 40px; */
          }
  
          .invoice-box table tr.heading td {
              background: ${globalData||"#ccc"};
              border-bottom: 1px solid #ddd;
              font-weight: bold;
              font-size: 12px;
          }
  
          .invoice-box table tr.details td {
              padding-bottom: 20px;
          }
  
          .invoice-box table tr.item td {
              border-bottom: 1px solid #eee;
          }
  
          .invoice-box table tr.item.last td {
              border-bottom: none;
          }
  
          .invoice-box table tr.total td:nth-child(2) {
              border-top: 2px solid #eee;
              font-weight: bold;
          }
  
          @media only screen and (max-width: 600px) {
              .invoice-box table tr.top table td {
                  width: 100%;
                  display: block;
                  text-align: center;
              }
  
              .invoice-box table tr.information table td {
                  width: 100%;
                  display: block;
                  text-align: center;
              }
          }
  
          /** RTL **/
          .rtl {
              direction: rtl;
              font-family: Tahoma, 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
          }
  
          .rtl table {
              text-align: right;
          }
  
          .rtl table tr td:nth-child(2) {
              text-align: left;
          }
  
  
  
          #gallery {
              display: flex;
              flex-wrap: wrap;
              /* justify-content: space-around; */
              padding: 20px;
          }
  
          .gallery-row {
              display: flex;
              justify-content: space-around;
              margin-bottom: 20px;
          }
  
          .gallery-item {
              margin: 10px;
              box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
              overflow: hidden;
              transition: transform 0.3s ease-in-out;
          }
  
  
  
          .gallery-item img {
              width: 100%;
              height: 150px;
              display: block;
          }
      </style>
      <div>
  
  
          <div class="invoice-box">
              <table cellpadding="0" cellspacing="0">
                  <tr class="top_rw">
                      <td colspan="2">
                          <h2 style="margin-bottom: 10px;">INVOICE </h2>
                      </td>
  
                  </tr>
  
                  <tr class="information">
                      <td colspan="3">
                          <table>
                              <tr>
                                  <td>
                                      <img src="${business_logo}" alt="img" style="height: 120px;">
                                  </td>
  
                                  <td style="text-align: left">
                                      <b> Nmae:__________ </b> <br>
                                      <b>GSTIN:</b><span> ABCD</span><br>
                                      Kokar, Ranchi <br>
                                      <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 20"
                                          id="phone">
                                          <path fill="none" d="M0 0h24v24H0V0z"></path>
                                          <path
                                              d="M19.23 15.26l-2.54-.29c-.61-.07-1.21.14-1.64.57l-1.84 1.84c-2.83-1.44-5.15-3.75-6.59-6.59l1.85-1.85c.43-.43.64-1.03.57-1.64l-.29-2.52c-.12-1.01-.97-1.77-1.99-1.77H5.03c-1.13 0-2.07.94-2 2.07.53 8.54 7.36 15.36 15.89 15.89 1.13.07 2.07-.87 2.07-2v-1.73c.01-1.01-.75-1.86-1.76-1.98z">
                                          </path>
                                      </svg>+0651-908-090-009<br>
  
                                      <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="3 10 60 20"
                                          id="phone">
                                          <path fill="none" d="M0 0h24v24H0V0z"></path>
                                          <path
                                              d="M32 2H16c-3.31 0-6 2.69-6 6v32c0 3.31 2.69 6 6 6h16c3.31 0 6-2.69 6-6V8c0-3.31-2.69-6-6-6zm-4 40h-8v-2h8v2zm6.5-6h-21V8h21v28z">
                                          </path>
                                          <path fill="none" d="M0 0h48v48H0z"></path>
                                      </svg>+0651-908-090-009 <br>
  
  
                                      abc@gmail.com<br>
                                      www.abc.com
                                  </td>
                                  <td colspan="2" style="text-align: right">
                                      <b> Invoice </b> <br>
                                      INVI0001 <br>
                                      <b>DATE</b><br>
                                      30/11/2023 <br>
                                      <b>DUE</b><br>
                                      On Receipt <br>
  
                                      <b>BALANCE DUE</b><br>
                                      USD $434.65
                                  </td>
  
                              </tr>
  
                          </table>
                      </td>
                  </tr>
  
  
                  <tr class="top">
                      <td colspan="3">
                          <table>
                              <tr>
                                  <td>
                                      <b> Bill To </b> <br>
                                      <b>ABC NAME</b> <br>
  
                                      Kokar, Ranchi <br>
                                      <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 20"
                                          id="phone">
                                          <path fill="none" d="M0 0h24v24H0V0z"></path>
                                          <path
                                              d="M19.23 15.26l-2.54-.29c-.61-.07-1.21.14-1.64.57l-1.84 1.84c-2.83-1.44-5.15-3.75-6.59-6.59l1.85-1.85c.43-.43.64-1.03.57-1.64l-.29-2.52c-.12-1.01-.97-1.77-1.99-1.77H5.03c-1.13 0-2.07.94-2 2.07.53 8.54 7.36 15.36 15.89 15.89 1.13.07 2.07-.87 2.07-2v-1.73c.01-1.01-.75-1.86-1.76-1.98z">
                                          </path>
                                      </svg>+0651-908-090-009<br>
  
                                      <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="3 10 60 20"
                                          id="phone">
                                          <path fill="none" d="M0 0h24v24H0V0z"></path>
                                          <path
                                              d="M32 2H16c-3.31 0-6 2.69-6 6v32c0 3.31 2.69 6 6 6h16c3.31 0 6-2.69 6-6V8c0-3.31-2.69-6-6-6zm-4 40h-8v-2h8v2zm6.5-6h-21V8h21v28z">
                                          </path>
                                          <path fill="none" d="M0 0h48v48H0z"></path>
                                      </svg>+0651-908-090-009 <br>
  
                                      123<br>
                                      abc@gmail.com<br>
                                      www.abc.com
                                  </td>
                      </td>
                  </tr>
              </table>
              </td>
              </tr>
  
              <!-- Assuming you have a container for the items with the id "invoiceItems" -->
              <td colspan="3">
                  <table cellspacing="0px" cellpadding="2px" id="invoiceItems">
                      <tr class="heading">
                          <td style="width:25%;">DESCRIPTION</td>
                          <td style="width:15%; text-align:right;">RATE</td>
                          <td style="width:10%; text-align:center;">QTY</td>
                          <td style="width:10%; text-align:right;">DISCOUNT</td>
                          <td style="width:10%; text-align:right;">AMOUNT</td>
                      </tr>
  
                      <!-- JavaScript loop will go here to generate item rows dynamically -->
                  </table>
              </td>
  
              <script>
                  // Sample data for the loop
                  const items = [
                      { description: "ABC:xyz", rate: 322.03, quantity: 2, discount: -0.94, amount: 57.97 },
                      { description: "ABC:xyz", rate: 322.03, quantity: 2, discount: -0.94, amount: 57.97 },
                      { description: "TRR:xyz", rate: 322.03, quantity: 2, discount: -0.44, amount: 59.97 }
                      // Add more items as needed
                  ];
  
                  // Loop through items and append HTML to the table
                  const invoiceItemsTable = document.getElementById('invoiceItems');
  
                  items.forEach(item => {
                      invoiceItemsTable.innerHTML += "
              <tr class="item">
                  <td style="width:25%;"><b></b></td>
                  <td style="width:10%; text-align:right;">$</td>
                  <td style="width:10%; text-align:center;"></td>
                  <td style="width:15%; text-align:right;"> <br><span>2%</span></td>
                  <td style="width:15%; text-align:right;"></td>
              </tr>
          ";
                  });
              </script>
  
              </table>
              <!-- <tr class="total">
                    <td colspan="3" align="right">  Total Amount in Words :  <b> Three Hundred Eighty Rupees Only </b> </td>
              </tr> -->
              <tr>
                  <td colspan="3">
                      <table cellspacing="0px" cellpadding="2px">
                          <tr>
                              <td width="50%">
                                  <b> PAYMENT INFO</b> <br>
                                  <b>PAYPAL</b><span>: abc@gmail.com</span><br>
                                  <b>PAYMENT INSTRUCTIONS</b><span>: abc</span><br>
                                  <b>BY CHECK</b><span>: XYZ</span><br>
                                  <b>OTHER</b><span>: XYZ</span><br>
  
                              </td>
  
                              <td>
                                  <table>
  
                                      <tr width="50%">
                                          <td style="width:25%;">
                                              <b>SUBTOTAL</b>
                                          </td>
  
                                          <td>
                                              $345.78
                                          </td>
                                      </tr>
  
                                      <tr>
                                          <td style="width:25%;">
                                              <b>DISCOUNT(2%)</b>
                                          </td>
  
                                          <td>
                                              -322.03
                                          </td>
                                      </tr>
  
  
                                      <tr class="item">
                                          <td style="width:25%;"><b>GST</b>
  
                                          <td style="width:10%; text-align:right;">
                                              $0.00
                                          </td>
                                      </tr>
  
                                      <tr class="item">
                                          <td style="width:25%;"><b>PAID</b>
  
                                          <td style="width:10%; text-align:right;">
                                              $0.00
                                          </td>
                                      </tr>
  
                                      <tr class="item">
                                          <td style="width:25%;"><b>TOTAL</b>
  
                                          <td style="width:10%; text-align:right;">
                                              $553.00
                                          </td>
                                      </tr>
                                      <tr>
                                          <td style="width:25%;"><b>BALANCE DUE</b>
  
                                          <td style="width:10%; text-align:right;">
                                              <b> USD$5335.00</b>
                                          </td>
  
                                      </tr>
                                  </table>
                              </td>
                          </tr>
                      </table>
                  </td>
              </tr>
              <div style="text-align: end;">
                  <tr>
                      </td>
                      <td>
                          <b> DATA SIGNED </b>
                          <br>
                          <br>
                          ...................................
                          <br>
                          <br>
                          <br>
                      </td>
                  </tr>
              </div>
  
  
              </table>
              </td>
              </tr>
              </table>
  
              <b>Please leave a rating/review on</b><br>
              <a href="#">https://inv.com</a><br>
  
              <br>
              <br>
              <br>
  
              <b>Notes:_____________</b>
  
              <div id="gallery">
                  <!-- JavaScript loop will go here to generate gallery items dynamically -->
              </div>
  
              <script>
                  // Sample data for the loop
                  const images = ['img1.png', 'img1.png', 'img1.png',];
                  // Add more image URLs as needed
  
                  // Container for the gallery
                  const galleryContainer = document.getElementById('gallery');
  
                  // Loop through images and append HTML to the gallery container
                  images.forEach((image, index) => {
                      // Create a new row for every 2 images
                      if (index % 2 === 0) {
                          galleryContainer.innerHTML += '<div class="gallery-row">';
                      }
  
                      // Generate HTML for each image
                      galleryContainer.innerHTML += "
                          <div class="gallery-item">
                          </div>
                      ";
  
                      // Close the row for every 2 images
                      if (index % 2 === 1 || index === images.length - 1) {
                          galleryContainer.innerHTML += '</div>';
                      }
                  });
              </script>
  
          </div>
  
  
  
      </div>
  
  
  </body>
  
  </html>`;
  return script;
};