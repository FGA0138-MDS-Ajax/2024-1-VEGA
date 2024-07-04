<?php
session_start();


use PAGAMENTO\Config;

function getPaymentFailureBody($status, $amount, $name, $currency, $email, $country, $paymentType)
{
    ob_start();

?>

    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">

    <head>
        <meta name="viewport" content="width=device-width" />
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>Payment Failure</title>
    </head>

    <body itemscope itemtype='http://schema.org/EmailMessage' style="margin: 0; font-family: 'HelveticaNeue', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 13px; color: #616161; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: none; width: 100%; height: 100%; line-height: 1.6em; background-color: #f0f0f0;">

        <table style='vertical-align: top; width: 100%;'>
            <tr>
                <td style='vertical-align: top;'></td>
                <td width='900px' style='vertical-align: top; padding: 0 !important; width: 100% !important;'>
                    <div style='max-width: 1200px; margin: 0 auto; display: block; padding: 20px;'>
                        <table width='100%' cellpadding='0' cellspacing='0' itemprop='action' itemscope itemtype='http://schema.org/ConfirmAction' style='background-color: #fff; border-radius: 2px;'>
                            <tr>
                                <td style='padding: 20px;'>
                                    <meta itemprop='name' content='Confirm Email' />
                                    <table width='100%' cellpadding='0' cellspacing='0'>
                                        <tr>
                                            <td>
                                                <h2 style="color: #211a1a;">
                                                    Payment for your order
                                                    not succeeded.</h2>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <h3>More details:</h3>
                                                <div>
                                                    <div style="color: #000; padding: 5px;">
                                                        Amount (<?php echo Config::CURRENCY_SYMBOL; ?>): <span style="color: #565656"><?php
                                                                                                                                        if (!empty($amount)) {
                                                                                                                                            echo number_format($amount, 2);
                                                                                                                                        }
                                                                                                                                        ?></span>
                                                    </div>
                                                    <div style="color: #000; padding: 5px;">
                                                        Currency: <span style="color: #565656"><?php

                                                                                                echo $currency;
                                                                                                ?></span>
                                                    </div>
                                                    <div style="color: #000; padding: 5px;">
                                                        Payment Status: <span style="color: #565656"><?php

                                                                                                        echo $status;
                                                                                                        ?></span>
                                                    </div>
                                                    <div style="color: #000; padding: 5px;">
                                                        Payment Mode: <span style="color: #565656"><?php
                                                                                                    echo $paymentType;
                                                                                                    ?></span>
                                                    </div>
                                                </div>
                                                </hr>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </div>
                </td>
                <td></td>
            </tr>
        </table>
        <p>If you have questions about your order or general feedback,
            please contact us.</p>
        </hr>
        <i>This email was sent to <?php
                                    if (!empty($email)) {
                                        echo $email;
                                    }
                                    ?>. This email is an order confirmation and product delivery email,
            for the purchase made. It is
            not a marketing or promotional email and that is why this email
            does not contain an unsubscribe link. Still you have the option
            to register your grievance via contact form.</i>
    </body>

    </html>

<?php

    return ob_get_clean();
}
?>