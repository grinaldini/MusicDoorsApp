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
 // Getting the received JSON into $json variable.
 $json = file_get_contents('php://input');

 // decoding the received JSON and store into $obj variable.
 $obj = json_decode($json,true);

 // Populate Student ID from JSON $obj array and store into $S_ID.
 $code = $obj['code'];
 $user_type_id = $obj['user_type_id'];

 // Creating SQL query and Updating the current record into MySQL database table.
 $Sql_Query = "DELETE FROM accessCodes WHERE code = '$code' and user_type_id = '$user_type_id' ";
 $check1 = mysqli_query($conn,$Sql_Query);

 $Sql_Query2 = "SELECT * FROM accessCodes WHERE code = '$code' and user_type_id = '$user_type_id'";
 
 // Executing SQL Query.
 $check = mysqli_query($conn,$Sql_Query2);

 $rows = array();

if ($check->num_rows >0) {

    $json = false;

    $json = json_encode($rows);


    echo $json;
} 
 
 else{
 
    // If the record inserted successfully then show the message.
    $ValidMSG = false;

    // Converting the message into JSON format.
    $ValidMSGJSon = json_encode($ValidMSG);

    // Echo the message.
    echo $ValidMSGJSon ;
 
 }
 mysqli_close($conn);
?>
