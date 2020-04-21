<?php
 
// Importing DBConfig.php file.
$HostName = "localhost";

//Define your database name here.
$DatabaseName = "musicdoo_database";

//Define your database username here.
$HostUser = "musicdoo_root_us";

//Define your database password here.
$HostPass = "musicdoors@dallas@2020";
 
// Creating connection.
$con = mysqli_connect($HostName,$HostUser,$HostPass,$DatabaseName);
 
 // Getting the received JSON into $json variable.
$json = file_get_contents('php://input');
 
 // decoding the received JSON and store into $obj variable.
$obj = json_decode($json,true);

// Populate access code from JSON $obj array and store into $code.
$code = $obj['code'];

$email = $obj['email'];
 

//Applying code query based off assigned user type id 
$Sql_Query = "SELECT * FROM accessCodes WHERE code = '$code' AND description = '$email' ";
 
// Executing SQL Query.
$check = mysqli_query($con,$Sql_Query);

$rows = array();

if ($check->num_rows >0) {
 
    $ValidMSG = true;
    $ValidMSG = json_encode($ValidMSG);
    echo $ValidMSG;
    
} 
else {
 
    // If the record inserted successfully then show the message.
    $InvalidMSG = false;

    // Converting the message into JSON format.
    $InvalidMSGJSon = json_encode($InvalidMSG);

    // Echo the message.
    echo $InvalidMSGJSon ;
 
}
 
 mysqli_close($con);

?>