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

$appointment_id = $obj['appointment_id'];




$query = "UPDATE lessonAppointments SET available='No' WHERE id='$appointment_id' ";

$check1 = mysqli_query($conn, $query);

$SQLquery = "SELECT * FROM lessonAppointments WHERE id = '$appointment_id' AND available = 'No' ";

$result = mysqli_query($conn, $SQLquery);

$rows = array();

if ($result->num_rows >0) {


 while($r= mysqli_fetch_array($result)) {

    $rows[] = $r;
 }
 $json = json_encode($rows);

} else {
    $invalidMsg = false;
    $invalidJson = json_encode($invalidMsg);
    echo $invalidJson;
}

echo $json;

mysqli_close($conn);

?>