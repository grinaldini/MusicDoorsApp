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


$user_type_id = 5;
// Creating SQL command to fetch all records from Table.
$query = "SELECT * FROM mainTable where user_type_id = '$user_type_id' ";

$result = mysqli_query($conn, $query);

$rows = array();

if ($result->num_rows >0) {


 while($r= mysqli_fetch_array($result)) {

    $rows[] = $r;
 }
 $json = json_encode($rows);

 echo $json;

} else {
   $invalidMsg = false;
   $invalidJson = json_encode($invalidMsg);
   echo $invalidJson;
}

mysqli_close($conn);

?>