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


 $id = $obj['id'];
 $email = $obj['email'];
 $password = $obj['password'];
 $first_name = $obj['first_name'];
 $last_name = $obj['last_name'];
 $phone_number = $obj['phone_number'];
 $street_address = $obj['street_address'];
 $city = $obj['city'];
 $state = $obj['state'];
 $zip_code = $obj['zip_code'];
 $feeder_school = $obj['feeder_school'];
 $current_school = $obj['current_school'];
 $instrument = $obj['instrument'];
 $instrument_2 = $obj['instrument_2'];
 $instrument_3 = $obj['instrument_3'];
 // Creating SQL query and insert the record into MySQL database table.
 
 
$query = " UPDATE mainTable SET email='$email',password='$password', first_name='$first_name', last_name= '$last_name', phone_number='$phone_number', street_address='$street_address', city='$city', state='$state', zip_code='$zip_code', feeder_school='$feeder_school', current_school='$current_school', instrument='$instrument', instrument_2='$instrument_2', instrument_3='$instrument_3' WHERE id='$id' ";
$check1 = mysqli_query($con, $query);


$Sql_Query = " SELECT * FROM mainTable WHERE email='$email' AND password='$password' AND first_name='$first_name'AND last_name= '$last_name' AND phone_number='$phone_number' AND street_address='$street_address' AND city='$city' AND state='$state' AND zip_code='$zip_code' AND feeder_school='$feeder_school' AND current_school='$current_school' AND instrument='$instrument' AND instrument_2='$instrument_2' AND instrument_3='$instrument_3' ";
$check2 = mysqli_query($con, $Sql_Query);


$rows = array();


if ($check2->num_rows >0) {

    while($r= mysqli_fetch_array($check2)) {

        $rows[] = $r;
     }
     $json = json_encode($rows);
    
    
     echo $json;

 } else {

    $InvalidMSG = false;

    // Converting the message into JSON format.
    $InvalidMSG = json_encode($InvalidMSG);
    
    // Echo the message.
     echo $InvalidMSG ;

 }

 mysqli_close($con);

?>