<?php

$myemail = 'you@yoursite.com';

$date    = $_POST['date'];
$email   = $_POST['email'];
$subject = $_POST['subject'];
$time    = $_POST['time'];
$persons = $_POST['persons'];

$to            = $myemail;
$email_subject = "Table reservation";
$email_body    = "\n Date: $date \n Email: $email \n Subject: Table reservation \n Time: $time \n Persons: $persons";
$headers       = "From: $email";
 
mail($to, $email_subject, $email_body, $headers);

?>