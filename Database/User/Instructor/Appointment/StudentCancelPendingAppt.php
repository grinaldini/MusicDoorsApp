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

$student_id = $obj['student_id'];
$instructor_id = $obj['instructor_id'];
$date = $obj['date'];
$start = $obj['start'];
$end = $obj['end'];


// Creating SQL command to fetch all records from Table.



$query = "UPDATE lessonAppointments SET student_id='$student_id', available='Pending' WHERE start = '$start' AND end = '$end' AND available = 'Yes' AND instructor_id = '$instructor_id' AND date= '$date' ORDER BY date ASC";

$check1 = mysqli_query($conn, $query);

$Sql_Query = "SELECT * FROM lessonAppointments WHERE start = '$start' AND end = '$end' AND available = 'Pending' AND instructor_id = '$instructor_id' AND date= '$date'";

$check2 = mysqli_query($conn, $Sql_Query);

$rows = array();


if ($check2->num_rows >0) {

 
   while($r= mysqli_fetch_array($check2)) {

      $rows[] = $r;
   }
   $json = json_encode($rows);
   
   echo $json;

} else {
   // If the record inserted successfully then show the message.
   $InValidMSG = false;

   // Converting the message into JSON format.
   $InValidMSGJSon = json_encode($InValidMSG);

   // Echo the message.
   echo $InValidMSGJSon ;
}

mysqli_close($conn);

?>