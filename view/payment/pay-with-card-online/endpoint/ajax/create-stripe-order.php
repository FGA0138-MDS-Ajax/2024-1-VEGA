<?php
session_start();


use PAGAMENTO\StripeService;

$content = trim(file_get_contents("php://input"));

$jsondecoded = json_decode($content, true);
if (!empty($jsondecoded)) {
    $shippingTotal = $jsondecoded["shippingTotal"];
    $totalAmount = $jsondecoded["totalAmount"] + $shippingTotal;
    $name = $jsondecoded["name"];
    $email = $jsondecoded["email"];
    $phone = $jsondecoded["phone"];
    $address = $jsondecoded["address"];
    $message = $jsondecoded["message"];
    $currency = $jsondecoded["currency"];

    $itemArrayDecoded = $jsondecoded["items"];
    $customerDetailsArray = array(
        "name" => filter_var($jsondecoded["name"], FILTER_SANITIZE_STRING),
        "email" => filter_var($jsondecoded["email"], FILTER_SANITIZE_EMAIL),
        "phone" => filter_var($jsondecoded["phone"], FILTER_SANITIZE_STRING),
        "address" => filter_var($jsondecoded["address"], FILTER_SANITIZE_STRING),
        "message" => filter_var($jsondecoded["message"], FILTER_SANITIZE_STRING),
        "currency" => $jsondecoded["currency"]
    );

    $_SESSION["PAGAMENTO-cart"] = array(
        "items" => $itemArrayDecoded,
        "customerDetails" => $customerDetailsArray,
        "shippingAmount" => $shippingTotal
    );

    require_once __DIR__ . '/../../Service/StripeService.php';
    $stripeService = new StripeService();
    $result = $stripeService->createCheckoutSession($totalAmount, $currency, $customerDetailsArray, $itemArrayDecoded);
    print_r($result);
}
