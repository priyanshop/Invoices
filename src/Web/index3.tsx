import moment from "moment";

export const preview3 = (globalData: any) => {
  const script = `
  <!DOCTYPE html>
  <html class="no-js" lang="en">
  
  <!-- Added by HTTrack -->
  <meta http-equiv="content-type" content="text/html;charset=utf-8" /><!-- /Added by HTTrack -->
  
  <head>
    <!-- Meta Tags -->
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="author" content="Laralink">
    <!-- Site Title -->
    <title>Template-3</title>
    <link rel="stylesheet" href="assets/css/style.css">
    <button id="pdf-generate">Download</button>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <link rel="stylesheet" href="https://kendo.cdn.telerik.com/2017.1.223/styles/kendo.common.min.css" />
    <script src="https://kendo.cdn.telerik.com/2017.1.223/js/jszip.min.js"></script>
    <script src="https://kendo.cdn.telerik.com/2017.1.223/js/kendo.all.min.js"></script>
  </head>
  
  <body>
    <div class="page-container hidden-on-narrow">
      <div class="pdf-page size-a4">
        <page size="A4">
          <div class="tm_container">
            <div class="tm_invoice_wrap">
              <div class="tm_invoice tm_style1 tm_type1" id="tm_download_section">
                <div class="tm_invoice_in">
                  <div class="tm_invoice_head tm_top_head tm_mb15 tm_align_center">
                    <div class="tm_invoice_left">
                      <div class="tm_logo"><img src="${
                        globalData.b_business_logo
                      }" alt="Logo"></div>
                    </div>
                    <div class="tm_invoice_right tm_text_right tm_mobile_hide">
                      <div class="tm_f50 tm_text_uppercase tm_white_color">Invoice</div>
                    </div>
                    <div class="tm_shape_bg tm_accent_bg tm_mobile_hide"></div>
                  </div>
                  <div class="tm_invoice_info tm_mb25">
                    <div class="tm_card_note tm_mobile_hide"><b class="tm_primary_color">Payment Method: </b>Paypal,
                      Western Union</div>
                    <div class="tm_invoice_info_list tm_white_color">
                      <p class="tm_invoice_number tm_m0">Invoice No: ${globalData.invoice_number}</p>
                      <p class="tm_invoice_date tm_m0">Date: ${moment(
                        globalData.invoice_date,
                      ).format('yyyy-MM-DD')}</p>
                    </div>
                    <div class="tm_invoice_seperator tm_accent_bg"></div>
                  </div>
                  <div class="tm_invoice_head tm_mb10">
                    <div class="tm_invoice_left">
                      <p class="tm_mb2"><b class="tm_primary_color">Invoice To:</b></p>
                      <p>
                        Lowell H. Dominguez <br>
                        84 Spilman Street, London <br>United Kingdom <br>
                        lowell@gmail.com
                      </p>
                    </div>
                    <div class="tm_invoice_right tm_text_right">
                      <p class="tm_mb2"><b class="tm_primary_color">Pay To:</b></p>
                      <p>
                        Laralink Ltd <br>
                        86-90 Paul Street, London<br>
                        England EC2A 4NE <br>
                        demo@gmail.com
                      </p>
                    </div>
                  </div>
                  <div class="tm_table tm_style1">
                    <div class="">
                      <div class="tm_table_responsive">
                        <table>
                          <thead>
                            <tr class="tm_accent_bg">
                             
                              <th class="tm_width_4 tm_semi_bold tm_white_color">Description</th>
                              <th class="tm_width_2 tm_semi_bold tm_white_color">Price</th>
                              <th class="tm_width_1 tm_semi_bold tm_white_color">Qty</th>
                              <th class="tm_width_2 tm_semi_bold tm_white_color tm_text_right">Total</th>
                            </tr>
                          </thead>
                          <tbody>
                          ${
                            globalData?.items?.length > 0 &&
                            globalData?.items?.map(
                              (item: any, index: number) =>
                                `<tr>
<td class="tm_width_4">
${item.description}
</td>
<td class="tm_width_2">$${item.rate}</td>
<td class="tm_width_1">${item.unit}</td>
<td class="tm_width_2 tm_text_right">$${item.total}</td>
</tr>`,
                            )
                          } 
                            
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div class="tm_invoice_footer tm_border_top tm_mb15 tm_m0_md">
                      <div class="tm_left_footer">
                        <p class="tm_mb2"><b class="tm_primary_color">Payment info:</b></p>
                        <p class="tm_m0">Credit Card - 236***********928 <br>Amount: $1732</p>
                      </div>
                      <div class="tm_right_footer">
                        <table class="tm_mb15">
                          <tbody>
                            <tr class="tm_gray_bg ">
                              <td class="tm_width_3 tm_primary_color tm_bold">Sub Total:</td>
                              <td class="tm_width_3 tm_primary_color tm_bold tm_text_right">$${globalData.invoice_total}</td>
                            </tr>
                             <tr class="tm_gray_bg ">
                              <td class="tm_width_3 tm_primary_color tm_bold">Salse:</td>
                              <td class="tm_width_3 tm_primary_color tm_bold tm_text_right">$0</td>
                            </tr> 
                            <tr class="tm_gray_bg ">
                              <td class="tm_width_3 tm_primary_color tm_bold">Discount:</td>
                              <td class="tm_width_3 tm_primary_color tm_bold tm_text_right">$${globalData?.invoice_discount_amount || 0}</td>
                            </tr>
                            <tr class="tm_gray_bg">
                              <td class="tm_width_3 tm_primary_color">Tax: <span class="tm_ternary_color">(5%)</span></td>
                              <td class="tm_width_3 tm_primary_color tm_text_right">+$${globalData?.invoice_total_tax_amount || 0}</td>
                            </tr>
                            <tr class="tm_gray_bg ">
                              <td class="tm_width_3 tm_primary_color tm_bold">Total:</td>
                              <td class="tm_width_3 tm_primary_color tm_bold tm_text_right">$${(
                                parseFloat(
                                  globalData?.invoice_total_tax_amount || 0,
                                ) +
                                parseFloat(globalData?.invoice_total || 0) -
                                parseFloat(
                                  globalData?.invoice_discount_amount || 0,
                                )
                              ).toFixed(2)}</td>
                            </tr>
                            <tr class="tm_accent_bg">
                              <td class="tm_width_3 tm_border_top_0 tm_bold tm_f16 tm_white_color">BALANCE DUE: </td>
                              <td class="tm_width_3 tm_border_top_0 tm_bold tm_f16 tm_white_color tm_text_right">$${(
                                parseFloat(
                                  globalData.invoice_total_tax_amount || 0,
                                ) +
                                parseFloat(globalData.invoice_total || 0) -
                                parseFloat(
                                  globalData.invoice_discount_amount || 0,
                                )
                              ).toFixed(2)}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <!-- <div class="tm_invoice_footer tm_type1">
                      <div class="tm_left_footer"></div>
                      <div class="tm_right_footer">
                        <div class="tm_sign tm_text_center">
                          <img src="assets/img/sign.svg" alt="Sign">
                          <p class="tm_m0 tm_ternary_color">Jhon Donate</p>
                          <p class="tm_m0 tm_f16 tm_primary_color">Accounts Manager</p>
                        </div>
                      </div>
                    </div> -->
                  </div>
                  <div class="tm_note tm_text_center tm_font_style_normal">
                    <hr class="tm_mb15">
                    <p class="tm_mb2"><b class="tm_primary_color"></b></p>
                    <p class="tm_m0">Thank you for business!
                      This is sample invoice.
                    </p>
                  </div><!-- .tm_note -->
                </div>
              </div>
              <!-- <div class="tm_invoice_btns tm_hide_print">
                <a href="javascript:window.print()" class="tm_invoice_btn tm_color1">
                  <span class="tm_btn_icon">
                    <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512">
                      <path
                        d="M384 368h24a40.12 40.12 0 0040-40V168a40.12 40.12 0 00-40-40H104a40.12 40.12 0 00-40 40v160a40.12 40.12 0 0040 40h24"
                        fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="32" />
                      <rect x="128" y="240" width="256" height="208" rx="24.32" ry="24.32" fill="none"
                        stroke="currentColor" stroke-linejoin="round" stroke-width="32" />
                      <path d="M384 128v-24a40.12 40.12 0 00-40-40H168a40.12 40.12 0 00-40 40v24" fill="none"
                        stroke="currentColor" stroke-linejoin="round" stroke-width="32" />
                      <circle cx="392" cy="184" r="24" fill='currentColor' />
                    </svg>
                  </span>
                  <span class="tm_btn_text">Print</span>
                </a>
                <button id="tm_download_btn" class="tm_invoice_btn tm_color2">
                  <span class="tm_btn_icon">
                    <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512">
                      <path
                        d="M320 336h76c55 0 100-21.21 100-75.6s-53-73.47-96-75.6C391.11 99.74 329 48 256 48c-69 0-113.44 45.79-128 91.2-60 5.7-112 35.88-112 98.4S70 336 136 336h56M192 400.1l64 63.9 64-63.9M256 224v224.03"
                        fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                        stroke-width="32" />
                    </svg>
                  </span>
                  <span class="tm_btn_text">Download</span>
                </button>
              </div> -->
            </div>
          </div>
        </page>
      </div>
    </div>
    <script>
      // Import DejaVu Sans font for embedding
  
      // NOTE: Only required if the Kendo UI stylesheets are loaded
      // from a different origin, e.g. cdn.kendostatic.com
      kendo.pdf.defineFont({
        "DejaVu Sans": "https://kendo.cdn.telerik.com/2016.2.607/styles/fonts/DejaVu/DejaVuSans.ttf",
        "DejaVu Sans|Bold": "https://kendo.cdn.telerik.com/2016.2.607/styles/fonts/DejaVu/DejaVuSans-Bold.ttf",
        "DejaVu Sans|Bold|Italic": "https://kendo.cdn.telerik.com/2016.2.607/styles/fonts/DejaVu/DejaVuSans-Oblique.ttf",
        "DejaVu Sans|Italic": "https://kendo.cdn.telerik.com/2016.2.607/styles/fonts/DejaVu/DejaVuSans-Oblique.ttf"
      });
    </script>
    <script>
      function getPDF(selector) {
        kendo.drawing.drawDOM($(selector)).then(function (group) {
          kendo.drawing.pdf.saveAs(group, 'testing.pdf');
        });
      }
    </script>
    <script type="text/javascript">
      $('#pdf-generate').click(function () {
        getPDF('.pdf-page');
      })
    </script>
    <script src="assets/js/vendor/jquery-3.6.0.min.js"></script>
    <script src="assets/js/app.min.js"></script>
    <script src="assets/js/main.js"></script>
    <!-- <script src="assets/js/jquery.min.js"></script>
    <script src="assets/js/jspdf.min.js"></script>
    <script src="assets/js/html2canvas.min.js"></script>
    <script src="assets/js/main.js"></script> -->
  </body>
  
  </html>
    `;
  return script;
};