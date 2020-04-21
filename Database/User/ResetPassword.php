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

 $email = $obj['email'];
 $new_password = $obj['new_password'];
 // Creating SQL query and insert the record into MySQL database table.
 
 
$query = " UPDATE mainTable SET password='$new_password' WHERE email='$email' ";
$check1 = mysqli_query($con, $query);


$Sql_Query = " SELECT * FROM mainTable WHERE email='$email' AND password='$new_password' ";
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