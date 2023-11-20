import moment from 'moment';

export const preview4 = (globalData: any) => {
  const script = `
  <!DOCTYPE html>
  <html class="no-js" lang="en">
  <!-- Added by HTTrack -->
  <meta http-equiv="content-type" content="text/html;charset=utf-8" /><!-- /Added by HTTrack -->
  
  <head>
    <!-- Meta Tags -->
    <meta charset="utf-8" />
    <meta http-equiv="x-ua-compatible" content="ie=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="author" content="Laralink" />
    <!-- Site Title -->
    <title>Template-4</title>
    <button id="pdf-generate">Download</button>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <link rel="stylesheet" href="https://kendo.cdn.telerik.com/2017.1.223/styles/kendo.common.min.css" />
    <script src="https://kendo.cdn.telerik.com/2017.1.223/js/jszip.min.js"></script>
    <script src="https://kendo.cdn.telerik.com/2017.1.223/js/kendo.all.min.js"></script>
    <link rel="stylesheet" href="assets/css/style.css" />
  </head>
  
  <body>
    <div class="page-container hidden-on-narrow">
      <div class="pdf-page size-a4">
        <page size="A4">
          <div class="tm_container">
            <div class="tm_invoice_wrap">
              <div class="tm_invoice tm_style2 tm_type1 tm_accent_border" id="tm_download_section">
                <div class="tm_invoice_in">
                  <div class="tm_invoice_head tm_top_head tm_mb20 tm_mb10_md">
                    <div class="tm_invoice_left">
                      <div class="tm_logo"><img src="${
                        globalData.b_business_logo
                      }" alt="Logo" /></div>
                    </div>
                    <!-- <div class="tm_invoice_right">
                <div class="tm_grid_row tm_col_3">
                  <div class="tm_text_center">
                    <p class="tm_accent_color tm_mb0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512" fill="currentColor"><path d="M424 80H88a56.06 56.06 0 00-56 56v240a56.06 56.06 0 0056 56h336a56.06 56.06 0 0056-56V136a56.06 56.06 0 00-56-56zm-14.18 92.63l-144 112a16 16 0 01-19.64 0l-144-112a16 16 0 1119.64-25.26L256 251.73l134.18-104.36a16 16 0 0119.64 25.26z"/></svg>
                    </p>
                    support@gmail.com <br>
                    jobs@gmail.com
                  </div>
                  <div class="tm_text_center">
                    <p class="tm_accent_color tm_mb0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512" fill="currentColor"><path d="M391 480c-19.52 0-46.94-7.06-88-30-49.93-28-88.55-53.85-138.21-103.38C116.91 298.77 93.61 267.79 61 208.45c-36.84-67-30.56-102.12-23.54-117.13C45.82 73.38 58.16 62.65 74.11 52a176.3 176.3 0 0128.64-15.2c1-.43 1.93-.84 2.76-1.21 4.95-2.23 12.45-5.6 21.95-2 6.34 2.38 12 7.25 20.86 16 18.17 17.92 43 57.83 52.16 77.43 6.15 13.21 10.22 21.93 10.23 31.71 0 11.45-5.76 20.28-12.75 29.81-1.31 1.79-2.61 3.5-3.87 5.16-7.61 10-9.28 12.89-8.18 18.05 2.23 10.37 18.86 41.24 46.19 68.51s57.31 42.85 67.72 45.07c5.38 1.15 8.33-.59 18.65-8.47 1.48-1.13 3-2.3 4.59-3.47 10.66-7.93 19.08-13.54 30.26-13.54h.06c9.73 0 18.06 4.22 31.86 11.18 18 9.08 59.11 33.59 77.14 51.78 8.77 8.84 13.66 14.48 16.05 20.81 3.6 9.53.21 17-2 22-.37.83-.78 1.74-1.21 2.75a176.49 176.49 0 01-15.29 28.58c-10.63 15.9-21.4 28.21-39.38 36.58A67.42 67.42 0 01391 480z"/></svg>
                    </p>
                    +99(0) 131 124 567 <br>
                    Monday to Friday
                  </div>
                  <div class="tm_text_center">
                    <p class="tm_accent_color tm_mb0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512" fill="currentColor"><circle cx="256" cy="192" r="32"/><path d="M256 32c-88.22 0-160 68.65-160 153 0 40.17 18.31 93.59 54.42 158.78 29 52.34 62.55 99.67 80 123.22a31.75 31.75 0 0051.22 0c17.42-23.55 51-70.88 80-123.22C397.69 278.61 416 225.19 416 185c0-84.35-71.78-153-160-153zm0 224a64 64 0 1164-64 64.07 64.07 0 01-64 64z"/></svg>
                    </p>
                    9 Paul Street, London <br>
                    England EC2A 4NE
                  </div>
                </div>
              </div> -->
                    <div class="tm_shape_bg tm_accent_bg"></div>
                  </div>
                  <div class="tm_invoice_info tm_mb10">
                    <div class="tm_invoice_info_left">
                      <p class="tm_mb2"><b>Invoice To:</b></p>
                      <p>
                        <b class="tm_f16 tm_primary_color">Lowell H. Dominguez</b>
                        <br />
                        84 Spilman Street, London <br />United Kingdom. <br />
                        lowell@gmail.com <br />
                        +44(0) 327 123 987
                      </p>
                    </div>
                    <div class="tm_invoice_info_right">
                      <div
                        class="tm_f50 tm_text_uppercase tm_text_center tm_invoice_title tm_mb15 tm_ternary_color tm_mobile_hide">
                        Invoice
                      </div>
                      <div class="tm_grid_row tm_col_3 tm_invoice_info_in tm_round_border tm_gray_bg">
                        <div>
                          <span>Invoice No:</span> <br />
                          <b class="tm_f18 tm_accent_color">${
                            globalData.invoice_number
                          }</b>
                        </div>
                        <div>
                          <span>Invoice Date:</span> <br />
                          <b class="tm_f18 tm_accent_color">${moment(
                            globalData.invoice_date,
                          ).format('yyyy-MM-DD')}</b>
                        </div>
                        <div>
                          <span>Balance DUE:</span> <br />
                          <b class="tm_f18 tm_accent_color">$${(
                            parseFloat(
                              globalData.invoice_total_tax_amount || 0,
                            ) +
                            parseFloat(globalData.invoice_total || 0) -
                            parseFloat(globalData.invoice_discount_amount || 0)
                          ).toFixed(2)}</b>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="tm_table tm_style1">
                    <div class="tm_round_border">
                      <div class="tm_table_responsive">
                        <table>
                          <thead>
                            <tr>
                              <th class="tm_width_7 tm_semi_bold tm_primary_color">
                                Description
                              </th>
                              <th class="tm_width_2 tm_semi_bold tm_primary_color">
                                Price
                              </th>
                              <th class="tm_width_1 tm_semi_bold tm_primary_color">
                                Qty
                              </th>
                              <th class="tm_width_2 tm_semi_bold tm_primary_color tm_text_right">
                                Total
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                          ${
                            globalData?.items?.length > 0 &&
                            globalData?.items?.map(
                              (item: any, index: number) =>
                                `<tr class="tm_gray_bg">
<td class="tm_width_7">
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
                    <div class="tm_invoice_footer tm_mb15 tm_m0_md">
                      <div class="tm_left_footer">
                        <div class="tm_mb10 tm_m0_md"></div>
                        <p class="tm_mb5">
                          <b class="tm_primary_color">Paypal & Stripe:</b>
                          <br />
                          invoma@gmail.com
                        </p>
                        <p class="tm_mb0">
                          <b class="tm_primary_color">Card Payment:</b> <br />
                          Visa, Master Card, American Axpress
                        </p>
                      </div>
                      <div class="tm_right_footer">
                        <table class="tm_mb15">
                          <tbody>
                            <tr>
                              <td class="tm_width_3 tm_primary_color tm_border_none tm_bold">
                                Sub Total:
                              </td>
                              <td class="tm_width_3 tm_primary_color tm_text_right tm_border_none tm_bold">
                                $${globalData.invoice_total}
                              </td>
                            </tr>
                            <tr>
                              <td class="tm_width_3 tm_primary_color tm_border_none tm_bold">
                                Salse:
                              </td>
                              <td class="tm_width_3 tm_primary_color tm_text_right tm_border_none tm_bold">
                                $0
                              </td>
                            </tr>
                            <tr>
                              <td class="tm_width_3 tm_danger_color tm_border_none tm_pt0">
                                Discount
                              </td>
                              <td class="tm_width_3 tm_danger_color tm_text_right tm_border_none tm_pt0">
                                +$${globalData?.invoice_discount_amount || 0}
                              </td>
                            </tr>
                            <tr>
                              <td class="tm_width_3 tm_primary_color tm_border_none tm_pt0">
                                Tax
                              </td>
                              <td class="tm_width_3 tm_primary_color tm_text_right tm_border_none tm_pt0">
                                +$${globalData?.invoice_total_tax_amount || 0}
                              </td>
                            </tr>
                            <tr>
                              <td class="tm_width_3 tm_primary_color tm_border_none tm_bold">
                                Total:
                              </td>
                              <td class="tm_width_3 tm_primary_color tm_text_right tm_border_none tm_bold">
                                $${(
                                  parseFloat(
                                    globalData?.invoice_total_tax_amount || 0,
                                  ) +
                                  parseFloat(globalData?.invoice_total || 0) -
                                  parseFloat(
                                    globalData?.invoice_discount_amount || 0,
                                  )
                                ).toFixed(2)}
                              </td>
                            </tr>
                            <tr>
                              <td
                                class="tm_width_3 tm_border_top_0 tm_bold tm_f18 tm_white_color tm_accent_bg tm_radius_6_0_0_6">
                                BALANCE DUE:
                              </td>
                              <td
                                class="tm_width_3 tm_border_top_0 tm_bold tm_f18 tm_primary_color tm_text_right tm_white_color tm_accent_bg tm_radius_0_6_6_0">
                                $${(
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
                  </div>
                  <div class="tm_bottom_invoice">
                    <div class="tm_bottom_invoice_left">
                      <p class="tm_m0 tm_f18 tm_accent_color tm_mb5">
                        Thank you for business! This is sample invoice.
                      </p>
                      <!-- <p class="tm_primary_color tm_f12 tm_m0 tm_bold">Terms & Condition</p>
                      <p class="tm_m0 tm_f12">IInvoice was created on a computer and is valid without the signature and
                        seal.</p> -->
                    </div>
                    <div class="tm_bottom_invoice_right tm_mobile_hide">
                      <div class="tm_logo"><img src="" alt="Logo" /></div>
                    </div>
                  </div>
                </div>
              </div>
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
        "DejaVu Sans":
          "https://kendo.cdn.telerik.com/2016.2.607/styles/fonts/DejaVu/DejaVuSans.ttf",
        "DejaVu Sans|Bold":
          "https://kendo.cdn.telerik.com/2016.2.607/styles/fonts/DejaVu/DejaVuSans-Bold.ttf",
        "DejaVu Sans|Bold|Italic":
          "https://kendo.cdn.telerik.com/2016.2.607/styles/fonts/DejaVu/DejaVuSans-Oblique.ttf",
        "DejaVu Sans|Italic":
          "https://kendo.cdn.telerik.com/2016.2.607/styles/fonts/DejaVu/DejaVuSans-Oblique.ttf",
      });
    </script>
    <script>
      function getPDF(selector) {
        kendo.drawing.drawDOM($(selector)).then(function (group) {
          kendo.drawing.pdf.saveAs(group, "testing.pdf");
        });
      }
    </script>
    <script type="text/javascript">
      $("#pdf-generate").click(function () {
        getPDF(".pdf-page");
      });
    </script>
    <script src="assets/js/vendor/jquery-3.6.0.min.js"></script>
    <script src="assets/js/app.min.js"></script>
    <script src="assets/js/main.js"></script>
  </body>
  
  </html>
    `;
  return script;
};