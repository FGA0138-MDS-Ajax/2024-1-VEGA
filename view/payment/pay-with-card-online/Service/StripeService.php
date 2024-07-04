<?php

namespace PAGAMENTO;

require_once __DIR__ . '/../../vendor/stripe/stripe-php-7.97.0/init.php';
use Stripe\Stripe;
use Stripe\WebhookEndpoint;

class StripeService
{

    private $apiKey;

    private $stripeService;

    public function __construct()
    {
        require_once __DIR__ . '/../Config/Config.php';
        $this->apiKey = Config::STRIPE_SECRET_KEY;
        $this->stripeService = new Stripe();
        $this->stripeService->setVerifySslCerts(false);
        $this->stripeService->setApiKey($this->apiKey);
    }

    public function createWebhookEnpoint()
    {
        $id = $this->getAllWebhookEndpoint();

        if (empty($id)) {
            $webhook = new WebhookEndpoint();
            $webookhookEndpoint = array(
                "url" => Config::STRIPE_WEBHOOK_ENDPOINT_URL,
                "enabled_events" => [
                    "checkout.session.completed",
                    "customer.created",
                    "charge.succeeded",
                    "charge.failed"
                ]
            );

            $webhook->create($webookhookEndpoint);
        }
    }

    public function getAllWebhookEndpoint()
    {
        $webhook = new WebhookEndpoint();
        $response = $webhook->all();
        $response->jsonSerialize();
        $id = "";
        if (! empty($response['data'])) {
            foreach ($response['data'] as $k => $v) {
                if ($response['data'][$k]['url'] == Config::STRIPE_WEBHOOK_ENDPOINT_URL) {
                    $id = $response['data'][$k]['id'];
                }
            }
        }
        return $id;
    }

    public function createCheckoutSession($totalAmount, $currency, $customerDetailsArray, $itemArrayDecoded)
    {
        try {
            $this->createWebhookEnpoint();
            $this->stripeService->setApiKey($this->apiKey);
            $lineItems = array();
            foreach ($itemArrayDecoded[0] as $items) {
                $lineItems[] = [
                    'price_data' => [
                        'currency' => $currency,
                        'product_data' => [
                            'name' => $items["name"]
                        ],
                        'unit_amount' => $items["unit_price"] * 100
                    ],
                    'quantity' => $items["quantity"]
                ];
            }
            $session = \Stripe\Checkout\Session::create([
                'payment_method_types' => [
                    'card'
                ],
                'shipping_rates' => [
                    Config::SHIPMENT_RATES
                ],
                'shipping_address_collection' => [
                    'allowed_countries' => [
                        'US',
                        'DE',
                        'GB'
                    ]
                ],
                'customer_email' => $customerDetailsArray['email'],
                'line_items' => [
                    $lineItems
                ],
                'billing_address_collection' => "auto",
                'metadata' => $customerDetailsArray,
                'success_url' => Config::THANKYOU_URL . '?session_id={CHECKOUT_SESSION_ID}',
                'cancel_url' => Config::CANCEL_URL,
                'mode' => 'payment',
                'locale' => 'auto'
            ]);
            return $session["id"];
        } catch (\Stripe\Exception\CardException $e) {
            // Since it's a decline, \Stripe\Exception\CardException will be caught
            $e_json = $e->getJsonBody();
            $error = $e_json['error'];
            return $error;
        } catch (\Stripe\Exception\RateLimitException $e) {
            // Too many requests made to the API too quickly
            $e_json = $e->getJsonBody();
            $error = $e_json['error'];
            return $error;
        } catch (\Stripe\Exception\InvalidRequestException $e) {
            // Invalid parameters were supplied to Stripe's API
            $e_json = $e->getJsonBody();
            $error = $e_json['error'];
            return $error;
        } catch (\Stripe\Exception\AuthenticationException $e) {
            // Authentication with Stripe's API failed
            // (maybe you changed API keys recently)
            $e_json = $e->getJsonBody();
            $error = $e_json['error'];
            return $error;
        } catch (\Stripe\Exception\ApiConnectionException $e) {
            // Network communication with Stripe failed
            $e_json = $e->getJsonBody();
            $error = $e_json['error'];
            return $error;
        } catch (\Stripe\Exception\ApiErrorException $e) {
            // Display a very generic error to the user, and maybe send
            // yourself an email
            $e_json = $e->getJsonBody();
            $error = $e_json['error'];
            return $error;
        } catch (\Exception $e) {
            // Something else happened, completely unrelated to Stripe
            $e_json = $e->getJsonBody();
            $error = $e_json['error'];
            return $error;
        }
    }

    public function createProductAndPrice($productId, $dataArray, $price, $currency)
    {
        $existsProduct = \Stripe\Product::all();
        $existsProduct->jsonSerialize();
        $existsId = "";
        $priceId = "";
        $skuId = "";
        if (! empty($existsProduct['data'])) {
            foreach ($existsProduct['data'] as $k => $v) {
                if ($existsProduct['data'][$k]['id'] == $productId) {
                    $existsId = $existsProduct['data'][$k]['id'];

                    $existPrice = \Stripe\Price::all([
                        "product" => $existsId
                    ]);

                    $existSku = \Stripe\SKU::all([
                        "product" => $existsId
                    ]);

                    if (! empty($existPrice['data'][0]['id'])) {
                        $priceId = $existPrice['data'][0]['id'];
                    }
                    if (! empty($existSku['data'][0]['id'])) {
                        $skuId = $existSku['data'][0]['id'];
                    }
                }
            }
        }
        if (! empty($existsId)) {
            \Stripe\Product::update($existsId, [
                "metadata" => [
                    "Quantity" => $dataArray["quantity"]
                ]
            ]);
            \Stripe\SKU::update($skuId, [
                'price' => $dataArray["tax"]
            ]);
        } else {
            $product = \Stripe\Product::create([
                "id" => $productId,
                "name" => $dataArray["name"],
                "metadata" => [
                    "Quantity" => $dataArray["quantity"]
                ],
                "type" => "good"
            ]);

            $sku = \Stripe\SKU::create([
                'price' => $dataArray["tax"] * 100,
                'currency' => $currency,
                'inventory' => [
                    'type' => 'finite',
                    'quantity' => 1
                ],
                'product' => $product->id
            ]);

            $priceResponse = \Stripe\Price::create([
                "currency" => $currency,
                "unit_amount" => $price * 100,
                "product" => $product->id
            ]);

            $priceId = $priceResponse->id;
        }
        return $priceId;
    }

    public function retriveCustomer($customerId)
    {
        $this->stripeService->setApiKey($this->apiKey);
        $result = \Stripe\Customer::retrieve($customerId);

        return $result;
    }

    public function createPaymentIntent($orderId, $customerId, $amount, $currency, $name, $email, $digitalDownloadUrl)
    {
        try {
            $this->createWebhookEnpoint();

            $digitalDownloadUrl['order_id'] = $orderId;
            $digitalDownloadUrl['name'] = $name;
            $digitalDownloadUrl['email'] = $email;
            $digitalDownloadUrl['customer_id'] = $customerId;

            $this->stripeService->setApiKey($this->apiKey);
            // retrieve JSON from POST body
            $paymentIntent = \Stripe\PaymentIntent::create([
                'amount' => $amount * 100,
                'currency' => $currency,
                'payment_method_types' => [
                    'card'
                ],
                'metadata' => $digitalDownloadUrl
            ]);
            $output = [
                'clientSecret' => $paymentIntent->client_secret
            ];
            $output = array(
                "status" => "success",
                "response" => $output
            );
        } catch (\Error $e) {
            $output = array(
                "status" => "error",
                "response" => $e->getMessage()
            );
        }
        return $output;
    }
}
