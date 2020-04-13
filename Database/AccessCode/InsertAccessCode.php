<?php
$HostName = "localhost";

//Define your database name here.
$DatabaseName = "musicdoo_database";

//Define your database username here.
$HostUser = "musicdoo_root_us";

//Define your database password here.
$HostPass = "musicdoors@dallas@2020";

// Create connection
$conn = mysqli_connect($HostName, $HostUser, $HostPass, $DatabaseName);

if ($conn->connect_error) {

 die("Connection failed: " . $conn->connect_error);
}

// Connecting to MySQL Database.
 $con = mysqli_connect($HostName,$HostUser,$HostPass,$DatabaseName);

 // Getting the received JSON into $json variable.
 $json = file_get_contents('php://input');

 // decoding the received JSON and store into $obj variable.
 $obj = json_decode($json,true);

 
 $code = $obj['code'];
 $user_type_id = $obj['user_type_id'];
 $description = $obj['description'];
 $dateString = $obj['dateString'];


 // Creating SQL query and insert the record into MySQL database table.
 $Sql_Query = " insert into accessCodes (code,user_type_id,description,dateString) values ('$code','$user_type_id','$description','$dateString') ";
 $check1 = mysqli_query($con,$Sql_Query);
 $Sql_Query2 = "SELECT * FROM accessCodes WHERE code = '$code' and user_type_id = '$user_type_id' ";
 
// Executing SQL Query.
$check2 = mysqli_query($con,$Sql_Query2);

$rows = array();

if ($check2->num_rows >0) {
 $json = true;

 $json = json_encode($rows);


 echo $json;
} 
 
 else{
 
 // If the record inserted successfully then show the message.
$InvalidMSG = false;
 
// Converting the message into JSON format.
$InvalidMSGJSon = json_encode($InvalidMSG);
 
// Echo the message.
 echo $InvalidMSGJSon ;
 
 }
 mysqli_close($con);
?>
