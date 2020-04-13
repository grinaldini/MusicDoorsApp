<?php
// Getting the received JSON into $json variable.
$json = file_get_contents('php://input');
 
// decoding the received JSON and store into $obj variable.
$obj = json_decode($json,true);

// Populate access code from JSON $obj array and store into $code.
$email = $obj['email'];
$code = $obj['code'];

require('phpmailer/class.phpmailer.php');
$mail = new PHPMailer();
$subject = "Password Reset";
$content = "<b>Here is your temporary password for you to access your account:\n\n'$code'\n\nNote: If you did not request reset please contact dallasmusicdoors@gmail.com for assistance.\n\n\nBest,\nMusic Doors</b>";
$mail->IsSMTP();
$mail->SMTPDebug = 0;
$mail->SMTPAuth = TRUE;
$mail->SMTPSecure = "tls";
$mail->Port     = 587;  
$mail->Username = "dallasmusicdoors@gmail.com";
$mail->Password = "support@musicdoors@2020";
$mail->Host     = "smtp.gmail.com";
$mail->Mailer   = "smtp";
$mail->SetFrom("dallasmusicdoors@gmail.com", "Music Doors Customer Support");
$mail->AddReplyTo("dallasmusicdoors@gmail.com", "PHPPot");
$mail->AddAddress("'$email'");
$mail->Subject = $subject;
$mail->WordWrap   = 80;
$mail->MsgHTML($content);
$mail->IsHTML(true);

if(!$mail->Send()){
    $json = false;

    $json = json_encode($json);//update on server


    echo $json;
}
else{
    $json = true;

    $json = json_encode($json);//update on server


    echo $json;
}
?>