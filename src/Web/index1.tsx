import moment from "moment";

export const preview1 = (globalData: any) => {
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
      <title>Template-1</title>
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
                <div class="tm_invoice tm_style1" id="tm_download_section">
                  <div class="tm_invoice_in">
                    <div class="tm_invoice_head tm_align_center tm_mb20">
                      <div class="tm_invoice_left">
                        <div class="tm_logo"><img src="${
                          globalData.b_business_logo
                        }" alt="Logo" /></div>
                      </div>
                      <div class="tm_invoice_right tm_text_right">
                        <div class="tm_primary_color tm_f50 tm_text_uppercase">
                          Invoice
                        </div>
                      </div>
                    </div>
                    <div class="tm_invoice_info tm_mb20">
                      <div class="tm_invoice_seperator tm_gray_bg"></div>
                      <div class="tm_invoice_info_list">
                        <p class="tm_invoice_number tm_m0">
                          ${globalData.invoice_number}
                        </p>
                        <p class="tm_invoice_date tm_m0">
                          Date: <b class="tm_primary_color">${moment(
                            globalData.invoice_date,
                          ).format('yyyy-MM-DD')}</b>
                        </p>
                      </div>
                    </div>
                    <div class="tm_invoice_head tm_mb10">
                      <div class="tm_invoice_left">
                        <p class="tm_mb2">
                          <b class="tm_primary_color">Invoice To:</b>
                        </p>
                        <p>
                          Lowell H. Dominguez <br />
                          84 Spilman Street, London <br />United Kingdom <br />
                          lowell@gmail.com
                        </p>
                      </div>
                      <div class="tm_invoice_right tm_text_right">
                        <p class="tm_mb2">
                          <b class="tm_primary_color">Pay To:</b>
                        </p>
                        <p>
                          Laralink Ltd <br />
                          86-90 Paul Street, London<br />
                          England EC2A 4NE <br />
                          demo@gmail.com
                        </p>
                      </div>
                    </div>
                    <div class="tm_table tm_style1 tm_mb30">
                      <div class="tm_round_border">
                        <div class="tm_table_responsive">
                          <table>
                            <thead>
                              <tr>
                                <th class="tm_width_4 tm_semi_bold tm_primary_color tm_gray_bg">
                                  Description
                                </th>
                                <th class="tm_width_2 tm_semi_bold tm_primary_color tm_gray_bg">
                                  Price
                                </th>
                                <th class="tm_width_1 tm_semi_bold tm_primary_color tm_gray_bg">
                                  Qty
                                </th>
                                <th class="tm_width_2 tm_semi_bold tm_primary_color tm_gray_bg tm_text_right">
                                  Total
                                </th>
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
                      <div class="tm_invoice_footer">
                        <div class="tm_left_footer">
                          <p class="tm_mb2">
                            <b class="tm_primary_color">Payment info:</b>
                          </p>
                          <p class="tm_m0">
                            Credit Card - 236***********928 <br />Amount: $1732
                          </p>
                        </div>
                        <div class="tm_right_footer">
                          <table>
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
                                <td class="tm_width_3 tm_primary_color tm_border_none tm_bold">
                                  Discount:
                                </td>
                                <td class="tm_width_3 tm_primary_color tm_text_right tm_border_none tm_bold">
                                  $${globalData?.invoice_discount_amount || 0}
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
                              <tr class="tm_border_top tm_border_bottom">
                                <td class="tm_width_3 tm_border_top_0 tm_bold tm_f16 tm_primary_color">
                                  BALANCE DUE:
                                </td>
                                <td class="tm_width_3 tm_border_top_0 tm_bold tm_f16 tm_primary_color tm_text_right">
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
                    <div class="tm_padd_15_20 tm_round_border">
                      <ul class="tm_m0 tm_note_list">
                        <li>Thank you for business! This is sample invoice.</li>
                      </ul>
                    </div>
                    <!-- .tm_note -->
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
      <!-- <script src="assets/js/jquery.min.js"></script>
      <script src="assets/js/jspdf.min.js"></script>
      <script src="assets/js/html2canvas.min.js"></script>
      <script src="assets/js/main.js"></script> -->
    </body>
    
    </html>
    `;
  return script;
};
