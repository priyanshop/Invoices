// import moment from "moment";

export const estimatePreview = (globalData: any) => {
    const script = `
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Estimate</title>
        <style>
        .top_rw {
            background-color: #f4f4f4;
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
            background: #eee;
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
    </head>
    
    <body>
        <div class="invoice-box">
            <table cellpadding="0" cellspacing="0" style="width: 100%;">
                <tr class="top_rw">
                    <td colspan="2">
                        <h2 style="margin-bottom: 10px;"> ESTIMATE </h2>
                    </td>
                </tr>
    
                <!-- Information Section -->
                <tr class="information">
                    <td colspan="3">
                        <table style="width: 100%;">
                            <!-- Business Information -->
                            <tr>
                                <td>
                                    <img src="${globalData.b_business_logo}" alt="Business Logo" style="height: 120px;">
                                </td>
                                <td style="text-align: left;">
                                    <!-- Business Details -->
                                    ${globalData.b_name} <br>
                                    <b>GSTIN:</b><span> ABCD</span><br>
                                    ${globalData.b_address1} <br>
                                    ${globalData.b_address2} <br>
                                    ${globalData.b_address3} <br>
                                    <!-- Phone and Email -->
                                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 20"
                                        id="phone">
                                        <!-- Phone icon path -->
                                    </svg>
                                    ${globalData.b_phone_number} <br>
                                    <!-- Mobile and Email -->
                                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="3 10 60 20"
                                        id="phone">
                                        <!-- Mobile icon path -->
                                    </svg>
                                    ${globalData.b_mobile_number} <br>
                                    ${globalData.b_email} <br>
                                    ${globalData.b_website} <br>
                                </td>
                                <td colspan="2">
                                    <!-- Estimate Details -->
                                    <b> Estimate </b> <br>
                                    ${globalData.estimate_number} <br>
                                    <b>DATE</b><br>
                                    <!-- Format the date -->
                                    <script>
                                        var originalDate = new Date(data.estimate_date);
                                        var options = {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric',
                                            hour: 'numeric',
                                            minute: 'numeric',
                                            second: 'numeric'
                                        };
                                        var formattedDate = originalDate.toLocaleDateString('en-US', options);
                                        document.write(formattedDate);
                                    </script><br>
                                    <b>DUE</b><br>
                                    ${globalData.terms} <br>
                                    <b>BALANCE DUE</b><br>
                                    ${globalData.due_amount}
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
    
                <!-- Bill To Section -->
                <tr class="top">
                    <td colspan="3">
                        <table style="width: 100%;">
                            <tr>
                                <td>
                                    <b> Bill To </b> <br>
                                    ${globalData.c_name} </b>
                                    ${globalData.c_address1} <br>
                                    ${globalData.c_address2} <br>
                                    ${globalData.c_address3} <br>
                                    <!-- Customer Contact Information -->
                                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 20"
                                        id="phone">
                                        <!-- Phone icon path -->
                                    </svg>
                                    ${globalData.c_phone_number} <br>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="3 10 60 20"
                                        id="phone">
                                        <!-- Mobile icon path -->
                                    </svg>
                                    ${globalData.c_mobile_number} <br>
                                    ${globalData.c_fax} <br>
                                    ${globalData.c_email} <br>
                                    ${globalData.review_link} <br>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
    
                <!-- Estimate Items Section -->
                <tr>
                    <td colspan="3">
                        <table cellspacing="0px" cellpadding="2px" id="invoiceItems" style="width: 100%;">
                            <!-- Table Header -->
                            <tr class="heading">
                                <td style="width:25%; text-align:left;"><b>DESCRIPTION</b></td>
                                <td style="width:15%; text-align:right;">RATE</td>
                                <td style="width:10%; text-align:center;">QTY</td>
                                <td style="width:10%; text-align:right;">DISCOUNT</td>
                                <td style="width:10%; text-align:right;">AMOUNT</td>
                            </tr>
    
                            <!-- Iterate through items and create rows -->
                            ${globalData.items.map((item:any) => `
                            <tr class="item">
                                <td style="width:25%; text-align:left;"><b>${item.description} </b></td>
                                <td style="width:15%; text-align:right;">${item.rate} </td>
                                <td style="width:10%; text-align:center;">${item.quantity} </td>
                                <td style="width:10%; text-align:right;">
                                    ${item.discount_amount} <br><span>${item.discount_rate} % </span>
                                </td>
                                <td style="width:10%; text-align:right;">${item.total} </td>
                            </tr>`).join('')}
                        </table>
                    </td>
                </tr>
    
                <!-- Payment and Total Section -->
                <tr>
                    <td colspan="3">
                        <table cellspacing="0px" cellpadding="2px" style="width: 100%;">
                            <tr>
                                <td width="50%">
                                    <b> PAYMENT INFO</b> <br>
                                    <b>PAYPAL</b><span>: ${globalData.paypal_email} </span><br>
                                    <b>PAYMENT INSTRUCTIONS</b><span>: ${globalData.payment_instructions} </span><br>
                                    <b>BY CHECK</b><span>: ${globalData.make_checks_payable} </span><br>
                                    <b>OTHER</b><span>: ${globalData.additional_payment_instructions} </span><br>
                                </td>
                                <td>
                                    <table style="width: 100%;">
                                        <tr>
                                            <td style="width:25%;"><b>SUBTOTAL</b></td>
                                            <td>${globalData.estimate_subtotal} </td>
                                        </tr>
                                        <tr>
                                            <td style="width:25%;"><b>DISCOUNT( ${globalData.estimate_discount_value} %)</b></td>
                                            <td>${globalData.estimate_discount_amount} </td>
                                        </tr>
                                        <tr class="item">
                                            <td style="width:25%;"><b> ${globalData.estimate_tax_label} </b></td>
                                            <td style="width:10%; text-align:right;"> ${globalData.estimate_tax_rate} </td>
                                        </tr>
                                        <tr class="item">
                                            <td style="width:25%;"><b>TOTAL</b></td>
                                            <td style="width:10%; text-align:right;"> ${globalData.estimate_total} </td>
                                        </tr>
                                        <tr class="item">
                                            <td style="width:25%;"><b>PAID</b></td>
                                            <td style="width:10%; text-align:right;"> ${globalData.paid_amount} </td>
                                        </tr>
                                        <tr>
                                            <td style="width:25%;"><b>BALANCE DUE</b></td>
                                            <td style="width:10%; text-align:right;"><b> ${globalData.due_amount} </b></td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
    
                <!-- Signature Section -->
                <tr>
                    <td width="50%"></td>
                    <td>
                        <b> DATA SIGNED </b> <br> <br>
                        ....................... <br> <br> <br>
                    </td>
                </tr>
            </table>
        </div>
    
        <!-- Gallery Section -->
        <div id="gallery">
            <!-- Row 1 -->
            <div class="gallery-row">
                <!-- Image 1 -->
                <div class="gallery-item">
                    <img src="img1.png" alt="Image 1">
                </div>
                <!-- Image 2 -->
                <div class="gallery-item">
                    <img src="img1.png" alt="Image 2">
                </div>
            </div>
        </div>
    </body>
    
    </html>
      `;
    return script;
  };
  