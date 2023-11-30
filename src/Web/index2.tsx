import moment from 'moment';

export const preview2 = (globalData: any) => {
  const script = `
   
<!DOCTYPE html>
<html class="no-js" lang="en">

<!-- Added by HTTrack --><meta http-equiv="content-type" content="text/html;charset=utf-8" /><!-- /Added by HTTrack -->
<head>
  <!-- Meta Tags -->
  <meta charset="utf-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="author" content="Laralink">
  <!-- Site Title -->
  <title>Template-2</title>
  <button id="pdf-generate">Download</button>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
  <link rel="stylesheet" href="https://kendo.cdn.telerik.com/2017.1.223/styles/kendo.common.min.css" />
  <script src="https://kendo.cdn.telerik.com/2017.1.223/js/jszip.min.js"></script>
  <script src="https://kendo.cdn.telerik.com/2017.1.223/js/kendo.all.min.js"></script>
  <link rel="stylesheet" href="assets/css/style.css">
</head>

<body>
  <div class="page-container hidden-on-narrow">
    <div class="pdf-page size-a4">
      <page size="A4">
  <div class="tm_container">
    <div class="tm_invoice_wrap">
      <div class="tm_invoice tm_style2" id="tm_download_section">
        <div class="tm_invoice_in">
          <div class="tm_invoice_head tm_top_head tm_mb20">
            <div class="tm_invoice_left">
              <div class="tm_logo"><img src="${
                globalData.b_business_logo
              }" alt="Logo"></div>
            </div>
            <div class="tm_invoice_right">
              <div class="tm_ternary_color tm_f50 tm_text_uppercase tm_text_center tm_invoice_title tm_mb15 tm_mobile_hide">Invoice</div>
              <!-- <div class="tm_grid_row tm_col_3">
                <div>
                  <b class="tm_primary_color">Email</b> <br>
                  support@gmail.com <br>
                  career@gmail.com
                </div>
                <div>
                  <b class="tm_primary_color">Phone</b> <br>
                  +99-131-124-567 <br>
                  Monday to Friday
                </div>
                <div>
                  <b class="tm_primary_color">Address</b> <br>
                  9 Paul Street, London <br>
                  England EC2A 4NE
                </div>
              </div> -->
            </div>
          </div>
          <div class="tm_invoice_info tm_mb10">
            <div class="tm_invoice_info_left">
              <p class="tm_mb2"><b>Invoice To:</b></p>
              <p>
                <b class="tm_f16 tm_primary_color">Lowell H. Dominguez</b> <br>
                84 Spilman Street, London <br>United Kingdom. <br>
                lowell@gmail.com <br>
                +99-327-123-987
              </p>
            </div>
            <div class="tm_invoice_info_right">
              <!-- <div class="tm_ternary_color tm_f50 tm_text_uppercase tm_text_center tm_invoice_title tm_mb15 tm_mobile_hide">Invoice</div> -->
              <div class="tm_grid_row tm_col_3 tm_invoice_info_in tm_accent_bg">
                <div>
                  <span class="tm_white_color_60">BALANCE DUE:</span> <br>
                  <b class="tm_f16 tm_white_color">${(
                    parseFloat(globalData.invoice_total_tax_amount || 0) +
                    parseFloat(globalData.invoice_total || 0) -
                    parseFloat(globalData.invoice_discount_amount || 0)
                  ).toFixed(2)}</b>
                </div>
                <div>
                  <span class="tm_white_color_60">Invoice Date:</span> <br>
                  <b class="tm_f16 tm_white_color">${moment(
                    globalData.invoice_date,
                  ).format('yyyy-MM-DD')}</b>
                </div>
                <div>
                  <span class="tm_white_color_60">Invoice No:</span> <br>
                  <b class="tm_f16 tm_white_color">${
                    globalData.invoice_number
                  }</b>
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
                      <th class="tm_width_7 tm_semi_bold tm_accent_color">Description</th>
                      <th class="tm_width_2 tm_semi_bold tm_accent_color">Price</th>
                      <th class="tm_width_1 tm_semi_bold tm_accent_color">Qty</th>
                      <th class="tm_width_2 tm_semi_bold tm_accent_color tm_text_right">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                  ${
                    globalData?.items?.length > 0 &&
                    globalData?.items?.map(
                      (item: any, index: number) =>
                        `<tr class="tm_gray_bg">
<td class="tm_width_7">
  <p class="tm_m0 tm_f16 tm_primary_color">Website Design</p>
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
                <div class="tm_card_note tm_ternary_bg tm_white_color"><b>Payment info: </b>Credit Card - 236***********928</div>
                <p class="tm_mb2"><b class="tm_primary_color">Important Note:</b></p>
                <p class="tm_m0">Delivery dates are not guaranteed and Seller has <br>no liability for damages that may be incurred <br>due to any delay.</p>
              </div>
              <div class="tm_right_footer">
                <table class="tm_mb15">
                  <tbody>
                    <tr>
                      <td class="tm_width_3 tm_primary_color tm_border_none tm_bold">Sub Total:</td>
                      <td class="tm_width_3 tm_primary_color tm_text_right tm_border_none tm_bold">$${
                        globalData.invoice_total
                      }</td>
                    </tr> 
                     <tr>
                      <td class="tm_width_3 tm_primary_color tm_border_none tm_bold">Salse:</td>
                      <td class="tm_width_3 tm_primary_color tm_text_right tm_border_none tm_bold">$0</td>
                    </tr>
                    <tr>
                      <td class="tm_width_3 tm_danger_color tm_border_none tm_pt0">Discount 10%</td>
                      <td class="tm_width_3 tm_danger_color tm_text_right tm_border_none tm_pt0">+$${
                        globalData?.invoice_discount_amount || 0
                      }</td>
                    </tr>
                    <tr>
                      <td class="tm_width_3 tm_primary_color tm_border_none tm_pt0">Tax: 5%</td>
                      <td class="tm_width_3 tm_primary_color tm_text_right tm_border_none tm_pt0">+$${
                        globalData?.invoice_total_tax_amount || 0
                      }</td>
                    </tr>    <tr>
                      <td class="tm_width_3 tm_primary_color tm_border_none tm_pt0">Total:</td>
                      <td class="tm_width_3 tm_primary_color tm_text_right tm_border_none tm_pt0">+$${(
                        parseFloat(globalData?.invoice_total_tax_amount || 0) +
                        parseFloat(globalData?.invoice_total || 0) -
                        parseFloat(globalData?.invoice_discount_amount || 0)
                      ).toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td class="tm_width_3 tm_border_top_0 tm_bold tm_f16 tm_white_color tm_accent_bg tm_radius_6_0_0_6"> BALANCE DUE:</td>
                      <td class="tm_width_3 tm_border_top_0 tm_bold tm_f16 tm_primary_color tm_text_right tm_white_color tm_accent_bg tm_radius_0_6_6_0">$${(
                        parseFloat(globalData.invoice_total_tax_amount || 0) +
                        parseFloat(globalData.invoice_total || 0) -
                        parseFloat(globalData.invoice_discount_amount || 0)
                      ).toFixed(2)}</td>
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
          <div class="tm_note tm_font_style_normal tm_text_center">
            <hr class="tm_mb15">
            <p class="tm_mb2"><b class="tm_primary_color">Thank you for business! This is sample invoice.</b></p>
           
          </div><!-- .tm_note -->
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
