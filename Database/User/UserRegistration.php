<?php

$HostName = "localhost";

//Define your database name here.
$DatabaseName = "musicdoo_database";

//Define your database username here.
$HostUser = "musicdoo_root_us";

//Define your database password here.
$HostPass = "musicdoors@dallas@2020";

// Connecting to MySQL Database.
 $con = mysqli_connect($HostName,$HostUser,$HostPass,$DatabaseName);

 // Getting the received JSON into $json variable.
 $json = file_get_contents('php://input');

 // decoding the received JSON and store into $obj variable.
 $obj = json_decode($json,true);



 $user_type_id = $obj['user_type_id'];
 $email = $obj['email'];
 $password = $obj['password'];
 $first_name = $obj['first_name'];
 $last_name = $obj['last_name'];
 $phone_number = $obj['phone_number'];
 $street_address = $obj['street_address'];
 $email = $obj['email'];
 $city = $obj['city'];
 $state = $obj['state'];
 $zip_code = $obj['zip_code'];
 $feeder_school = $obj['feeder_school'];
 $current_school = $obj['current_school'];
 $instrument = $obj['instrument'];
 $instrument_2 = $obj['instrument_2'];
 $instrument_3 = $obj['instrument_3'];
 // Creating SQL query and insert the record into MySQL database table.
 $Sql_Query = "insert into mainTable(user_type_id,email,password,first_name,last_name,phone_number, street_address, city,state,zip_code,feeder_school,current_school,instrument, instrument_2, instrument_3) values ('$user_type_id','$email','$password','$first_name','$last_name','$phone_number','$street_address','$city','$state','$zip_code','$feeder_school','$current_school','$instrument', '$instrument_2', '$instrument_3')";


 if(mysqli_query($con,$Sql_Query)){

    $Sql_Query2 = "SELECT * FROM mainTable WHERE email = '$email' AND password = '$password' ";
 
    // Executing SQL Query.
    $check = mysqli_query($con,$Sql_Query2);

    $rows = array();


    while($r= mysqli_fetch_array($check)) {

        $rows[] = $r;
     }
     $json = json_encode($rows);
    
    
     echo $json;

 }
 else{

    $InvalidMSG = false;

    // Converting the message into JSON format.
    $InvalidMSG = json_encode($InvalidMSG);
    
    // Echo the message.
     echo $InvalidMSG ;
    

 }
 mysqli_close($con);
?>
