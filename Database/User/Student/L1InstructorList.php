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



$user_type_id = 5;
$feeder_school = $obj['feeder_school'];
$instrument = $obj['instrument'];
$instrument_2 = $obj['instrument_2'];
$instrument_3 = $obj['instrument_3'];

if($instrument_2 === null && $instrument_3 === null){
    // Creating SQL command to fetch all records from Table.
    $query = "SELECT * FROM mainTable WHERE feeder_school = '$feeder_school' and user_type_id ='$user_type_id' and (instrument='$instrument' or instrument_2='$instrument' or instrument_3='$instrument')";

    $result = mysqli_query($conn, $query);

    $rows = array();


}

if($instrument_2 === null && $instrument_3 !== null){
    // Creating SQL command to fetch all records from Table.
    $query = "SELECT * FROM mainTable WHERE feeder_school = '$feeder_school' and user_type_id ='$user_type_id' and ((instrument='$instrument' or instrument_2='$instrument' or instrument_3='$instrument') or (instrument ='$instrument_3' or instrument_2='$instrument_3' or instrument_3='$instrument_3'))";

    $result = mysqli_query($conn, $query);

    $rows = array();


}

if($instrument_2 !== null && $instrument_3 === null){
    // Creating SQL command to fetch all records from Table.
    $query = "SELECT * FROM mainTable WHERE feeder_school = '$feeder_school' and user_type_id ='$user_type_id' and ((instrument='$instrument' or instrument_2='$instrument' or instrument_3='$instrument') or (instrument ='$instrument_2' or instrument_2='$instrument_2' or instrument_3='$instrument_2'))";

    $result = mysqli_query($conn, $query);

    $rows = array();
}

if($instrument_2 !== null && $instrument_3 !== null){
    // Creating SQL command to fetch all records from Table.
    $query = "SELECT * FROM mainTable WHERE feeder_school = '$feeder_school' and user_type_id ='$user_type_id' and ((instrument='$instrument' or instrument_2='$instrument' or instrument_3='$instrument') or (instrument ='$instrument_2' or instrument_2='$instrument_2' or instrument_3='$instrument_2') or (instrument ='$instrument_3' or instrument_2='$instrument_3' or instrument_3='$instrument_3'))";

    $result = mysqli_query($conn, $query);

    $rows = array();
}

if ($result->num_rows >0) {


 while($r= mysqli_fetch_array($result)) {

    $rows[] = $r;
 }
 $json = json_encode($rows);

} else {
 echo false;
}

echo $json;

mysqli_close($conn);

?>