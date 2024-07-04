<?php
use PAGAMENTO\CheckoutService;
use PAGAMENTO\Config;


require_once __DIR__ . '/../../Config/Config.php';
$json = file_get_contents("php://input");

$result = json_decode($json, true);
if (! empty($result)) {

    $response = $result['data']['object'];

    require_once __DIR__ . '/../../Service/CheckoutService.php';
    $checkoutServiceObj = new CheckoutService();

    if ($result['type'] == "customer.created") {
        $email = $response["email"];
        $stripeCustomerId = $response["id"];
        $stripeCreateAt = date('Y-m-d h:i:s', $response["created"]);
    }
    if ($result['type'] == "charge.failed") {

        $paymentStatus = "Payment Failure";

        $email = $response['billing_details']['email'];

        $name = $response['billing_details']['name'];

        $addressAry = $response['billing_details']['address'];

        $country = $response['billing_details']['address']['country'];

        $amount = $response['amount'] / 100;

        $payerCurrency = $response['currency'];

        $recipientArr = array(
            $email => $email
        );

        $checkoutServiceObj->PaymentFailureMail($paymentStatus, $amount, $name, $payerCurrency, $email, $country, "Stripe", $recipientArr);
    }

    if ($result['type'] == "checkout.session.completed") {
    }

    if ($result['type'] == "charge.succeeded") {
        /*
         * Json values assign to php variables
         *
         */
        $email = $response['billing_details']['email'];

        $name = $response['billing_details']['name'];

        $addressAry = $response['billing_details']['address'];

        $country = $response['billing_details']['address']['country'];

        $payerCurrency = $response['currency'];

        $paid = $response['paid'];

        $paymentStatus = 'Completed';

        $amount = $response['amount'] / 100;

        $recipientArr = array(
            $email => $email
        );
        $sentMail = $checkoutServiceObj->sendPaymentEmail($paymentStatus, $amount, $name, $payerCurrency, $email, $country, "Stripe", $recipientArr);
        http_response_code(200);
    }
}
