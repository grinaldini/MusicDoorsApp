<?php
// Getting the received JSON into $json variable.
//$json = file_get_contents('php://input');
 
// decoding the received JSON and store into $obj variable.
//$obj = json_decode($json,true);

// Populate access code from JSON $obj array and store into $code.

$json = file_get_contents('php://input');
 
// decoding the received JSON and store into $obj variable.
$obj = json_decode($json,true);

// Populate access code from JSON $obj array and store into $code.
$email = $obj['email'];
$code = $obj['code'];

//hardcode emails and code for debugging 
//$email = "sdfa@smu.edu";
//$email2 = "fasasd@outlook.com";
//$code = "1234";

require ('./PHPMailer-master/PHPMailerAutoload.php');
$mail = new PHPMailer();
$subject = "Password Reset";
$content = "<br>Here is your temporary reset code for you to access your account:<b>  $code</b><br><br>Go to: Sign In => Forgot Password => Reset Password<br><br><i>Note: If you did not request this message please contact <b>dallasmusicdoors@gmail.com</b> for assistance.</i></br><br>Best,</br><br>Music Doors</br>";

$mail->IsSMTP();
$mail->SMTPDebug = 1;
$mail->SMTPAuth = true;
$mail->SMTPSecure = 'tls';
$mail->Host = "smtp.gmail.com";
$mail->Port = 587; 
$mail->IsHTML(true);
$mail->Username = "dallasmusicdoors@gmail.com";
$mail->Password = "support@musicdoors@2020";
$mail->SetFrom("dallasmusicdoors@gmail.com");

$mail->AddReplyTo("dallasmusicdoors@gmail.com");

$mail->Subject = $subject;
$mail->Body = $content;
$mail->AddAddress($email);
//add multiple emails
//$mail->AddAddress($email2);

if(!$mail->Send()){
    //it didnt work
    echo true;
    
}
else{
    //it worked

    echo false;
    
}
?>