<?php

namespace PAGAMENTO;

class Config
{

  const APP_ROOT = 'https://ultimatewebsolutions.net';

  const WORK_ROOT = '/PAGAMENTO/';

  const THANKYOU_URL = Config::APP_ROOT . Config::WORK_ROOT . 'pay-with-card-online/thank-you.php';

  const CANCEL_URL = Config::APP_ROOT . Config::WORK_ROOT . 'pay-with-card-online/';

  const STRIPE_PUBLISHABLE_KEY = 'pk_test_51J7cAgDAWsjxeaA44cjM6Qs88gEWPeHECm9RFsrmdBl1CCd1FKLXuNvLxRedNjFOWUEc345DVNRhzhVDmNa2PU3J00axtzYNYg';

  const STRIPE_SECRET_KEY = 'sk_test_51J7cAgDAWsjxeaA4RAyVMZUix0qxs2CpSrhZlailNgdvmhz7e68aEuOpbIiKWhQLPohMuc9KXNL48RvMCejlTk2q00DrwUyatB';

  const STRIPE_CREATE_ORDER_URL = Config::APP_ROOT . Config::WORK_ROOT . 'pay-with-card-online/endpoint/ajax/create-stripe-order.php';

  const STRIPE_WEBHOOK_ENDPOINT_URL = Config::APP_ROOT . Config::WORK_ROOT . 'pay-with-card-online/endpoint/webhook/capture-stripe-response.php';

  const ORDER_EMAIL_SUBJECT = 'Order Confirmation';

  const PAYMENT_CONFIRMATION_EMAIL_SUBJECT = 'Payment Confirmation';

  const PAYMENT_FAILURE_SUBJECT = 'Payment Failure';

  const CURRENCY = 'USD';

  const SHIPMENT_RATES  = 'shr_1JFfQIDAWsjxeaA4MhCHr8xg';

  const CURRENCY_SYMBOL = '$';

  /* Sender and Recipient
  ==================================== */
  const SENDER_NAME = 'PAGAMENTO';

  const SENDER_EMAIL = 'noreply@PAGAMENTO.com';

  // You can add one or more emails separated by a comma (,)
  // To whom the contact form should send the email, generally the Admin of the site
  const RECIPIENT_EMAIL = 'websolutions.ultimate@gmail.com';

  // If you want to send the same email message as a copy (CC), then enter the email(s) in below option
  const CC_EMAIL = '';

  // If you want to send the same email message as a blind copy (BCC), then enter the email(s) in below option
  const BCC_EMAIL = '';

  /* Mechanism to use, to send email  
  ==================================== */  
  // Options: smtp, sendmail, phpmail. Default is smtp but PAGAMENTO implemented to use only the phpmail option
  // phpmail uses your web server's default email server setup to send email
  const MAILER = 'phpmail';
}
