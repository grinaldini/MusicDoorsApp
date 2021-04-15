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

$id = $obj['id'];




$query = "UPDATE lessonAppointments SET canceled='No', available='Yes', student_id=0 WHERE id='$id' ";

$check1 = mysqli_query($conn, $query);

$SQLquery = "SELECT * FROM lessonAppointments WHERE id = '$id' AND canceled = 'Pending' ";

$result = mysqli_query($conn, $SQLquery);

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