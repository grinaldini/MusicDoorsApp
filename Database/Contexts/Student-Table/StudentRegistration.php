<?php

// Importing DBConfig.php file.
include '../../DBConfig.php';

// Connecting to MySQL Database.
 $con = mysqli_connect($HostName,$HostUser,$HostPass,$DatabaseName);

 // Getting the received JSON into $json variable.
 $json = file_get_contents('php://input');

 // decoding the received JSON and store into $obj variable.
 $obj = json_decode($json,true);



 $user_type_id = $obj['user_type_id'];
 $username = $obj['username'];
 $password = $obj['password'];
 $first_name = $obj['first_name'];
 $last_name = $obj['last_name'];
 $phone_number = $obj['phone_number'];
 $email = $obj['email'];
 $city = $obj['city'];
 $state = $obj['state'];
 $zip_code = $obj['zip_code'];
 $feeder_school = $obj['feeder_school'];
 $current_school = $obj['current_school'];
 $instrument = $obj['instrument'];
 // Creating SQL query and insert the record into MySQL database table.
 $Sql_Query = "insert into mainTable(user_type_id,username,password,first_name,last_name,phone_number,email,city,state,zip_code,feeder_school,current_school,instrument) values ('$user_type_id','$username','$password','$first_name','$last_name','$phone_number','$email','$city','$state','$zip_code','$feeder_school','$current_school','$instrument')";


 if(mysqli_query($con,$Sql_Query)){

 // If the record inserted successfully then show the message.
$MSG = 'Record Successfully Inserted Into MySQL Database.' ;

// Converting the message into JSON format.
$json = json_encode($MSG);

// Echo the message.
 echo $json ;

 }
 else{

 echo 'Try Again';

 }
 mysqli_close($con);
?>
